import "std.sol";
import "RateCard.sol";

contract RateEx is owned, named("RateEx") {
    
    struct CallTx {
        address caller;
        address rateCard;
        uint countryCode;  
        uint telephoneNumber;
        uint timestamp;
        uint amountInWei;
        uint rate;
        uint maxInSeconds;
        uint callInSeconds;
        uint costInWei;
        uint refundInWei;
        bool completed;
        uint quality;
        bytes32 callHash;
    }
    
    address[] public rateCards;
    mapping (address => bool) public rateCardsMap;
    
    mapping (bytes32 => uint) callHashIndex;
    CallTx[] public calls;
    
    mapping (uint => bool) public destinations;
    
    event RateExInit(address owner);
    event AddRateCard(address rateCardAddress);
    event AddDestination(uint destination);
    
    event AddCallTx(address caller,
        address rateCard,
        uint countryCode,  
        uint telephoneNumber,
        uint timestamp,
        uint amountInWei,
        uint rate,
        uint maxInSeconds,
        bytes32 callHash);
        
    event NotEnoughEtherCallTx(address caller);    
        
    event CompletedCallTx(address caller,
        address rateCard,
        uint countryCode,  
        uint telephoneNumber,
        uint timestamp,
        uint amountInWei,
        uint rate,
        uint callInSeconds,
        uint costInWei,
        uint refundInWei);
    
    function RateEx() {
        
        RateExInit(msg.sender);
        
        // destinations we cover
        addDestination(44);
        addDestination(1);
        addDestination(91);
        
        // default rate cards
        addRateCard(0x17956ba5f4291844bc25aedb27e69bc11b5bda39); // alpha
        addRateCard(0xdf315f7485c3a86eb692487588735f224482abe3); // beta
        addRateCard(0xaefa01276783e1436e5b461c099edccb0448dcf6); // xyz
        addRateCard(0x06b179aabf198ced0f98c8ceca905a920a137ef4); // gltd
    }
    
    function numberOfRateCards() constant returns (uint count) {
        return rateCards.length;
    }
    
    function getRateCardDetails(uint index) constant returns (address cardAddress, bytes32 name, bytes32 domain) {
        if (rateCards[index] == 0x0) throw;
        
        return (rateCards[index], RateCard(rateCards[index]).name(), RateCard(rateCards[index]).domain());    
    } 
    
    // really should access RateCard direct
    // temp?
    function getRateForRateCard(address rateCard, uint countryCode) constant returns (uint rate) {
        uint res = RateCard(rateCard).rates(countryCode);   
        return res;
    } 
    
    function numberOfCalls() constant returns (uint count) {
        return calls.length;
    }
    
    function lengthOfTotalCalls() constant returns (uint count) {
        uint total = 0;
        for (uint i = 0; i < rateCards.length; i++) {
            total += total + calls[i].callInSeconds;
        }
        return total;
    }
    
    function addCall(address rateCard,
        uint countryCode,  
        uint telephoneNumber) returns (bytes32 callHash) {
        
        // invalid rate card    
        if (rateCardsMap[rateCard] == false) throw;
        
        // no rate
        if (RateCard(rateCard).rates(countryCode) == 0) throw;
            
        // ensure enough ether 
        // coinbase gets free calls!
        if (msg.value == 0 && msg.sender != 0xdedb49385ad5b94a16f236a6890cf9e0b1e30392) {
            NotEnoughEtherCallTx(msg.sender);
            return 0x0;
        } 
        
        bytes32 cHash = sha3(msg.sender, countryCode, telephoneNumber, block.timestamp);
        calls.push(CallTx(
            msg.sender, 
            rateCard, 
            countryCode, 
            telephoneNumber, 
            block.timestamp,
            msg.value, 
            RateCard(rateCard).rates(countryCode),
            msg.value / RateCard(rateCard).rates(countryCode),
            0,
            0, 
            0, 
            false, 
            0,
            cHash));
            
        AddCallTx(msg.sender, 
            rateCard, 
            countryCode, 
            telephoneNumber, 
            block.timestamp,
            msg.value,
            RateCard(rateCard).rates(countryCode),
            msg.value / RateCard(rateCard).rates(countryCode),
            callHash);    
            
        callHashIndex[cHash] = numberOfCalls();
            
        return cHash;    
    }
    
    function validateCall(bytes32 cHash) constant returns (uint maxInSeconds, uint countryCode, uint amountInWei) {
        if (callHashIndex[cHash] == 0) {
            return (0, 0, 0);
        }
        
        // we store length so index is one less
        uint index = callHashIndex[cHash] - 1; 
        
        // only rate card owner can verify
        address rc = calls[index].rateCard;
        if (RateCard(rc).owner() != msg.sender) {
            return (0, 0, 0);  
        }
        
        // already completed
        if (calls[index].completed == true) {
            return (0, 0, 0);   
        }
        
        return (calls[index].maxInSeconds, calls[index].countryCode, calls[index].amountInWei);
    }
    
    function completeCall(bytes32 cHash, uint callInSeconds) {
        
        if (callHashIndex[cHash] == 0) throw;
        
        // we store length so index is one less
        uint index = callHashIndex[cHash] - 1; 
        
        // only rate card owner can complete
        address rc = calls[index].rateCard;
        if (RateCard(rc).owner() != msg.sender) throw;
        
        calls[index].callInSeconds = callInSeconds;
        calls[index].costInWei = calls[index].rate * callInSeconds;
        calls[index].refundInWei = calls[index].amountInWei - calls[index].costInWei;
        calls[index].completed = true;

        CompletedCallTx(calls[index].caller,
            calls[index].rateCard,
            calls[index].countryCode,  
            calls[index].telephoneNumber,
            calls[index].timestamp,
            calls[index].amountInWei,
            calls[index].rate,
            calls[index].callInSeconds,
            calls[index].costInWei,
            calls[index].refundInWei);
            
        // send the parties involved their ether
        
        // refund
        if (calls[index].refundInWei > 0) {
            calls[index].caller.send(calls[index].refundInWei);
        }
        
        // rate card payment
        if (calls[index].costInWei > 0) {
            calls[index].rateCard.send(calls[index].costInWei);
        }
    }
    
    function qualityForRateCard(address rateCard) constant returns (uint qualityRating) {
        uint quality = 0;
        uint total = 0;
        for (uint i = 0; i < rateCards.length; i++) {
            if (calls[i].rateCard == rateCard) {
                if (calls[i].completed && calls[i].quality > 0) {
                    quality += calls[i].quality;
                    total += 1;
                }
            }
        }
        return quality / total;
    }
    
    function addRateCard(address rateCardAddress) onlyowner {
        rateCards.push(rateCardAddress);
        rateCardsMap[rateCardAddress] = true;
        AddRateCard(rateCardAddress);
    }
    
    function addDestination(uint countryCode) onlyowner {
        destinations[countryCode] = true;
        AddDestination(countryCode);
    }
    
    function lowestRateCard(uint countryCode) constant returns (uint lowestRate, address lowestRateCardAddress, uint quality) {
        
        // don't cover that destination
        if (destinations[countryCode] == false) throw;
        
        address lowestCard = 0x0;
        uint lowest = 999999;
        for (uint i = 0; i < rateCards.length; i++) {
            RateCard rc = RateCard(rateCards[i]);
            uint rate = rc.rates(countryCode);
            if (rate > 0 && rate < lowest) {
               lowest = rate; 
               lowestCard = rateCards[i]; 
            }
        }
        
        // no rate on exchange
        if (lowest == 999999) throw;
        
        return (lowest, lowestCard, 0); 
    }
    
    function quote(uint countryCode, uint timeInSecs) constant returns (uint amountInWei, uint lowestRate, address lowestRateCardAddress, uint quality) {
        // don't cover that destination
        if (destinations[countryCode] == false) throw;
        
        address lowestCard = 0x0;
        uint lowest = 999999;
        for (uint i = 0; i < rateCards.length; i++) {
            RateCard rc = RateCard(rateCards[i]);
            uint rate = rc.rates(countryCode);
            if (rate > 0 && rate < lowest) {
              lowest = rate; 
              lowestCard = rateCards[i]; 
            }
        }
        
        // no rate on exchange
        if (lowest == 999999) throw;
        
        return (lowest * timeInSecs, lowest, lowestCard, 0); 
    }
    
    // how much the RateEx is holding in escrow
    function getBalance() returns (uint bal) {
        return this.balance; 
    }
}