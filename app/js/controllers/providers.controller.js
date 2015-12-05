(function () {

    'use strict';

    mbApp.controllers.controller('ProvidersController', ProvidersController);

    // EventService needed to hook up events!
    function ProvidersController($log, $scope, $location, _, AuthService, RateEx, SupportedDestinations, RateExEvents) {

        var vm = this;

        this.login = function (rateCard) {
            AuthService.login(rateCard.name);
        };

        $scope.$on('auth:login', function () {
            $location.path('/provider-manage');
        });

        RateEx.rateCardCount().then(function (res) {
            vm.rateCardCount = res;
            $log.debug('Number of rate cards', vm.rateCardCount);
        });

        RateEx.getAllRateCard().then(function (rateCards) {
            $log.debug('Found All RateCards', rateCards);
            vm.rateCards = rateCards;
            _.forEach(rateCards, function (rateCard) {

                RateEx.getQualityForRateCard(rateCard.address)
                    .then(function (quality) {
                        // TODO can we use this on the frontend?
                        rateCard.quality = quality;
                    });

                _.forEach(SupportedDestinations, function (dest) {
                    RateEx.getRateForRateCard(rateCard.address, dest.countryCode).then(function (rate) {
                        _.defaults(rateCard, {
                            destinations: {}
                        });
                        rateCard.destinations[dest.countryCode] = {
                            rate: rate,
                            countryCode: dest.countryCode,
                            name: dest.name
                        }
                    });
                });
            })
        });
    }

})();