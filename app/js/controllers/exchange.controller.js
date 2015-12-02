(function () {

    'use strict';

    mbApp.controllers.controller('ExchangeController', ExchangeController);


    function ExchangeController($log, $rootScope, AuthService, RateEx, EventService) {

        var vm = this;

        vm.isAnonymous = AuthService.isAnonymous();

        RateEx.rateCardCount().then(function (res) {
            vm.rateCardCount = res;
            $log.debug('Number of rate cards', vm.rateCardCount);
        });

        $rootScope.$on('RateEx:AddDestination', function (event, data) {
            $log.debug('' + event, data);
        });

        // example of how to react to events - see event.service.js and RateEx.sol
        $rootScope.$on('RateEx:AddRateCard', function (event, data) {
            $log.debug('' + event, data);

            RateEx.rateCardCount().then(function (res) {
                vm.rateCardCount = res;
                $log.debug('Number of rate cards', vm.rateCardCount);
            });
        });
    }

})();