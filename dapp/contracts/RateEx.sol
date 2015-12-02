import "std.sol";

contract RateEx is owned, named("RateEx") {
    
    struct CallTx {
        address caller;
        address rateCard;
        uint countryCode;  
        uint telephoneNumber;
        uint amountInWei;
        uint callInSeconds;
        bool completed;
    }
    
    address[] public rateCards;
    CallTx[] public calls;
    
    event AddRateCard(address rateCardAddress);
    
    function RateEx() {
        
        // default rate card
        rateCards.push(0xdf315f7485c3a86eb692487588735f224482abe3);
        rateCards.push(0x06b179aabf198ced0f98c8ceca905a920a137ef4);
        
        // add a few mock calls
        calls.push(CallTx(0x0ec96244d9efcf1711b7383644abbe0f31bc5fcc, 0xdf315f7485c3a86eb692487588735f224482abe3, 44, 7930534450, 5 * 200000000000000000, 242, true));
        
    }
    
    function addRateCard(address rateCardAddress) {
        rateCards.push(rateCardAddress);
        AddRateCard(rateCardAddress);
    }
    

}