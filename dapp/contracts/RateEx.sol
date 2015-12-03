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
        uint callInSeconds;
        uint costInWei;
        uint refundInWei;
        bool completed;
        uint quality;
        bytes32 callHash;
    }
    
    address[] public rateCards;
    
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
        bytes32 callHash);
        
    event CompletedCallTx(address caller,
        address rateCard,
        uint countryCode,  
        uint telephoneNumber,
        uint timestamp,
        uint amountInWei,
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
        addRateCard(0xdf315f7485c3a86eb692487588735f224482abe3);
        addRateCard(0x17956ba5f4291844bc25aedb27e69bc11b5bda39);
        
        // add a few mock calls
        bytes32 chash1 = addCall(0x0ec96244d9efcf1711b7383644abbe0f31bc5fcc, 
            0xdf315f7485c3a86eb692487588735f224482abe3, 
            1, 
            2024561333, 
            600 * 5);
        
        completeCall(chash1, 64);
        
        bytes32 chash2 = addCall(0x0ec96244d9efcf1711b7383644abbe0f31bc5fcc, 
            0x17956ba5f4291844bc25aedb27e69bc11b5bda39, 
            44, 
            7930123234, 
            600 * 5);
        
        completeCall(chash2, 128);
    }
    
    function numberOfRateCards() constant returns (uint count) {
        return rateCards.length;
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
    
    function addCall(address caller,
        address rateCard,
        uint countryCode,  
        uint telephoneNumber,
        uint amountInWei) internal returns (bytes32 callHash) {

        bytes32 cHash = sha3(caller, countryCode, telephoneNumber, block.timestamp);
        calls.push(CallTx(
            caller, 
            rateCard, 
            countryCode, 
            telephoneNumber, 
            block.timestamp,
            amountInWei, 
            0,
            0, 
            0, 
            false, 
            0,
            cHash));
            
        AddCallTx(caller, 
            rateCard, 
            countryCode, 
            telephoneNumber, 
            block.timestamp,
            amountInWei,
            callHash);    
            
        callHashIndex[cHash] = numberOfCalls();
            
        return cHash;    
    }
    
    function completeCall(bytes32 cHash, uint callInSeconds) {
        
        if (callHashIndex[cHash] == 0) throw;
        
        uint index = callHashIndex[cHash] - 1; // we store length so index is one less
        uint rate = RateCard(calls[index].rateCard).rates(calls[index].countryCode);
        
        calls[index].callInSeconds = callInSeconds;
        calls[index].costInWei = rate * callInSeconds;
        calls[index].refundInWei = calls[index].amountInWei - calls[index].costInWei;
        calls[index].completed = true;

        CompletedCallTx(calls[index].caller,
            calls[index].rateCard,
            calls[index].countryCode,  
            calls[index].telephoneNumber,
            calls[index].timestamp,
            calls[index].amountInWei,
            calls[index].callInSeconds,
            calls[index].costInWei,
            calls[index].refundInWei);
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
        
        return (lowest, lowestCard, qualityForRateCard(lowestCard)); 
    }
    
    function quote(uint countryCode, uint timeInSecs) constant returns (uint amountInWei, address lowestRateCardAddress) {
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
        
        return (lowest * timeInSecs, lowestCard); 
    }
}