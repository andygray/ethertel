'use strict';

var SANDBOX_ID = '86bd5819233b50f19df7fc391984e4a9db0b3ad9';

mbApp.constants
    .constant('Web3Config', {
        SANDBOX_ID: SANDBOX_ID,
        /**
         * The endpoint
         */
        PROVIDER: 'http://ethertel.on.ether.camp' + ':8555/sandbox/' + SANDBOX_ID
    });