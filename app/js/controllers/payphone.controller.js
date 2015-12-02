(function () {

    'use strict';

    mbApp.controllers.controller('PayphoneController', PayphoneController);

    // EventService needed to hook up events!
    function PayphoneController($log, $rootScope, $scope, AuthService, RateEx, SupportedDestinations, SupportedRateCards, EventService) {

        var vm = this;

        vm.isAnonymous = AuthService.isAnonymous();

        vm.destinations = [];
        _.map(SupportedDestinations, function (dest) {
            RateEx.lowestRateForCountryCode(dest.countryCode).then(function (res) {
                $log.debug('Rate for ' + dest.name, res.rate);
                dest.rate = res.rate;
                dest.rateCard = res.rateCard;
                vm.destinations.push(dest);
            });
        });

        vm.quote = function() {
            if (vm.countryCode && vm.estimatedMins) {
                RateEx.quote(vm.countryCode, vm.estimatedMins * 60).then(function (res) {
                    $log.debug('Quote for ' + vm.countryCode, res.rate);

                    vm.myQuote = {
                        estimatedAmountInWei: res.estimatedAmountInWei,
                        rateCard: res.rateCard
                    };
                });
            }
        };

        vm.getPrettyRateCard = function (hash) {
            return SupportedRateCards[hash];
        };
    }

})();