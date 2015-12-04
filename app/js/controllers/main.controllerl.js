(function () {

    'use strict';

    mbApp
        .controllers
        .controller('MainController',
            ['$scope', '$location', '$q', 'AuthService', 'Web3Config', 'RateEx', '_',
                MainController
            ]);

    function MainController($scope, $location, $q, authService, Web3Config, RateEx, _) {

        var vm = this;

        vm.http_provider = Web3Config.PROVIDER;
    }

})();