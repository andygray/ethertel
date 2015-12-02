import "std.sol";

contract RateCard is abstract {
    
    // struct Rate {
    //     uint rateInWei;
    //     uint maxAmountInWei;
    // }
    
    bytes32 public name;
    bytes32 public domain;
    
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
    
    function setName(bytes32 pname) {
        name = pname;
    }
    
    function setDomain(bytes32 pdomain) {
        domain = pdomain;
    }
    
    // function getBalance() returns (uint bal) {
    //     return this.balance; 
    // }
}

contract RateCardAlpha is RateCard, owned, mortal {
   function RateCardAlpha() { 
        //uk
        addRate(44, 2);
        //usa
        addRate(1, 5);
        //india
        addRate(91, 7);
        
        setName(0x474c544400000000000000000000000000000000000000000000000000000000);
        setDomain(0x7369702e676c74642e6e65740000000000000000000000000000000000000000);
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
        
        setName(0x58595a0000000000000000000000000000000000000000000000000000000000);
        setDomain(0x7369702e78797a2e6e6574000000000000000000000000000000000000000000);
   }
}