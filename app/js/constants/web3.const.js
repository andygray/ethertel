'use strict';

var SANDBOX_ID = '522ca30096b731562df239c3998062e628e7d500';

mbApp.constants
    .constant('Web3Config', {
        /**
         * Change me....!
         */
        SANDBOX_ID: SANDBOX_ID,
        /**
         * The endpoint
         */
        PROVIDER: 'http://ethertel.on.ether.camp' + ':8555/sandbox/' + SANDBOX_ID
    });