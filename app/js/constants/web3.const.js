'use strict';

var SANDBOX_ID = 'a854d1c57732302d578e2d590f61f135f2ac0671';

mbApp.constants
    .constant('Web3Config', {
        SANDBOX_ID: SANDBOX_ID,
        /**
         * The endpoint
         */
        PROVIDER: 'http://ethertel.on.ether.camp' + ':8555/sandbox/' + SANDBOX_ID
    });