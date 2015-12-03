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

        RateEx.rateCardCount().then(function (count) {
            console.log("Count", count);

            var resolves = [];
            for (var index = 0; index < count - 1; index++) {
                resolves.push(RateEx.getRateCardDetails(index));
            }

            $q.all(resolves)
                .then(function (results) {
                    console.log(results);
                })
                .catch(function (error) {
                    console.error(error);
                })

        });
    }

})();