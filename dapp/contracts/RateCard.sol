import "std.sol";

contract RateCard is abstract {
    
    // struct Rate {
    //     uint rateInWei;
    //     uint maxAmountInWei;
    // }
    
    mapping (uint => uint) public rates;
    
    event RateInit(address owner);
    event RateAdded(uint countryCode, uint rateInWei);
    
    function RateCard() {
        RateInit(msg.sender);
    }
    
    function addRate(uint countryCode, uint rateInWei) {
    //   rates[countryCode] = Rate({rateInWei: rateInWei, maxAmountInWei: maxAmountInWei}); 
      rates[countryCode] =  rateInWei;
      RateAdded(countryCode, rateInWei);
    }
}

contract RateCardAlpha is RateCard, owned, mortal {
   function RateCardAlpha() { 
        //uk
        addRate(44, 2);
        //usa
        addRate(1, 5);
        //india
        addRate(91, 7);
   }
}
contract RateCardBeta is RateCard, owned, mortal {
       function RateCardBeta() { 
        //uk
        addRate(44, 1);
        //usa
        addRate(1, 6);
        //india
        addRate(91, 8);
   }
}