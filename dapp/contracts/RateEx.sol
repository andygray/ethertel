import "std.sol";
import "RateCard.sol";

contract RateEx is owned, named("RateEx") {
    
    struct CallTx {
        address caller;
        address rateCard;
        uint countryCode;  
        uint telephoneNumber;
        uint amountInWei;
        uint callInSeconds;
        uint costInWei;
        uint refundInWei;
        bool completed;
        uint quality;
    }
    
    address[] public rateCards;
    CallTx[] public calls;
    
    mapping (uint => bool) public destinations;
    
    event RateExInit(address owner);
    event AddRateCard(address rateCardAddress);
    event AddDestination(uint destination);
    
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
        calls.push(CallTx(
            0x0ec96244d9efcf1711b7383644abbe0f31bc5fcc, 
            0xdf315f7485c3a86eb692487588735f224482abe3, 
            44, 
            7930534450, 
            300 * 2, 
            242,
            242 * 2, 
            58 * 2, 
            true, 
            4));
            
        calls.push(CallTx(
            0x0ec96244d9efcf1711b7383644abbe0f31bc5fcc, 
            0xdf315f7485c3a86eb692487588735f224482abe3, 
            1, 
            2024561111, 
            600 * 5, 
            59,
            59 * 5, 
            541 * 2, 
            true, 
            4));
    }
    
    function addRateCard(address rateCardAddress) {
        rateCards.push(rateCardAddress);
        AddRateCard(rateCardAddress);
    }
    
    function addDestination(uint countryCode) onlyowner {
        destinations[countryCode] = true;
        AddDestination(countryCode);
    }
    
    function lowestRateCard(uint countryCode) constant returns (uint lowestRate, address lowestRateCardAddress) {
        
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
        
        return (lowest, lowestCard); 
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