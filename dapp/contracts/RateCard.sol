import "std.sol";

contract RateCard is abstract {
    
    struct Rate {
        uint rateInWei;
        uint maxAmountInWei;
        uint untilTimestamp;
    }
    
    mapping (uint => Rate) public rates;
    
    event RateInit(address owner);
    event RateAdded(uint countryCode, uint rateInWei, uint maxAmountInWei, uint untilTimestamp);
    
    function RateCard() {
        RateInit(msg.sender);
    }
    
    function addRate(uint countryCode, uint rateInWei, uint maxAmountInWei, uint untilTimestamp) {
      rates[countryCode] = Rate({rateInWei: rateInWei, maxAmountInWei: maxAmountInWei, untilTimestamp: untilTimestamp}); 
      RateAdded(countryCode, rateInWei, maxAmountInWei, untilTimestamp);
    }
}

contract RateCardAlpha is RateCard, owned, mortal {
   function RateCardAlpha() { 
        //uk
        addRate(44, 200000000000000000, 100000000000000000000, 1451043060);
        //usa
        addRate(1, 500000000000000000, 100000000000000000000, 1451043060);
        //india
        addRate(91, 700000000000000000, 100000000000000000000, 1451043060);
   }
}
contract RateCardBeta is RateCard, owned, mortal {
       function RateCardBeta() { 
        //uk
        addRate(44, 100000000000000000, 100000000000000000000, 1451043060);
        //usa
        addRate(1, 600000000000000000, 100000000000000000000, 1451043060);
        //india
        addRate(91, 750000000000000000, 100000000000000000000, 1451043060);
   }
}