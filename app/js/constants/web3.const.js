'use strict';

var SANDBOX_ID = '27fe573a471c886bea87db6af604c5086d2e081d';

mbApp.constants
    .constant('Web3Config', {
        SANDBOX_ID: SANDBOX_ID,
        /**
         * The endpoint
         */
        PROVIDER: 'http://ethertel.on.ether.camp' + ':8555/sandbox/' + SANDBOX_ID
    });