(function () {

    'use strict';

    mbApp.controllers.controller('ExchangeController', ExchangeController);

    // EventService needed to hook up events!
    function ExchangeController($log, $rootScope, $scope, AuthService, RateEx, SupportedDestinations, SupportedRateCards, EventService) {

        var vm = this;

        vm.isAnonymous = AuthService.isAnonymous();

        RateEx.rateCardCount().then(function (res) {
            vm.rateCardCount = res;
            $log.debug('Number of rate cards', vm.rateCardCount);
        });

        vm.destinations = []
        _.map(SupportedDestinations, function (dest) {
            RateEx.lowestRateForCountryCode(dest.countryCode).then(function (res) {
                $log.debug('Rate for ' + dest.name, res.rate);
                dest.rate = res.rate;
                dest.rateCard = res.rateCard;
                vm.destinations.push(dest);
            });
        });


        vm.getPrettyRateCard = function (hash) {
            return SupportedRateCards[hash];
        };

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