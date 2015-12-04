'use strict';

var SANDBOX_ID = '75da555d2f7999857ca8a1a3a2db1cdb202b79a1';

mbApp.constants
    .constant('Web3Config', {
        SANDBOX_ID: SANDBOX_ID,
        /**
         * The endpoint
         */
        PROVIDER: 'http://ethertel.on.ether.camp' + ':8555/sandbox/' + SANDBOX_ID
    });