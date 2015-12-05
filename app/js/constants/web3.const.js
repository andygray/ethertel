'use strict';

var SANDBOX_ID = '7ed5f25f5030ea374aa5b088dd1dbd0b261c0e85';

mbApp.constants
    .constant('Web3Config', {
        SANDBOX_ID: SANDBOX_ID,
        /**
         * The endpoint
         */
        PROVIDER: 'http://ethertel.on.ether.camp' + ':8555/sandbox/' + SANDBOX_ID
    });