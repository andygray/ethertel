import "std.sol";

contract RateCard is abstract {
    
    // struct Rate {
    //     uint rateInWei;
    //     uint maxAmountInWei;
    // }
    
    bytes32 public name;
    bytes32 public domain;
    
    mapping (uint => uint) public rates;
    
    event RateInit(address owner, bytes32 name);
    event RateAdded(uint countryCode, uint rateInWei);
    
    function RateCard(bytes32 _name, bytes32 _domain) {
        name = _name;
        domain = _domain;
        
        RateInit(msg.sender, name);
    }
    
    function addRate(uint countryCode, uint rateInWei) {
    //   rates[countryCode] = Rate({rateInWei: rateInWei, maxAmountInWei: maxAmountInWei}); 
      rates[countryCode] =  rateInWei;
      RateAdded(countryCode, rateInWei);
    }
    
    function getBalance() returns (uint bal) {
        return this.balance; 
    }
}

contract RateCardAlpha is RateCard(0x616c706861000000000000000000000000000000000000000000000000000000, 0x7369702e676c74642e6e65740000000000000000000000000000000000000000), owned, mortal {
   function RateCardAlpha() { 
        //uk
        addRate(44, 6);
        //usa
        addRate(1, 15);
        //india
        addRate(91, 6);
        
        changeOwner(0x84bfba8f12eb09a3963b62c55ad2893343e93ecc);
   }
}

contract RateCardBeta is RateCard(0x6265746100000000000000000000000000000000000000000000000000000000, 0x7369702e78797a2e6e6574000000000000000000000000000000000000000000), owned, mortal {
       function RateCardBeta() { 
        //uk
        addRate(44, 2);
        //usa
        addRate(1, 3);
        //india
        addRate(91, 9);
        
        changeOwner(0xd62c3ac42bd52faf8895c156eb9008513e9de5d8);
   }
}

contract RateCardGltd is RateCard(0x474c544400000000000000000000000000000000000000000000000000000000, 0x7369702e676c74642e6e65740000000000000000000000000000000000000000), owned, mortal {
   function RateCardGltd() { 
        //uk
        addRate(44, 2);
        //usa
        addRate(1, 5);
        //india
        addRate(91, 7);
        
        changeOwner(0x887e735ec8f358126a901b5a130b3efaf0ca18c5);
   }
}

contract RateCardXyz is RateCard(0x58595a0000000000000000000000000000000000000000000000000000000000, 0x7369702e78797a2e6e6574000000000000000000000000000000000000000000), owned, mortal {
       function RateCardXyz() { 
        //uk
        addRate(44, 3);
        //usa
        addRate(1, 16);
        //india
        addRate(91, 4);
        
        changeOwner(0xf7a8a273a1c0230519747ba55baf64a8df567707);
   }
}