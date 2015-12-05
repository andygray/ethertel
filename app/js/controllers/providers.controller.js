(function () {

    'use strict';

    mbApp.controllers.controller('ProvidersController', ProvidersController);

    // EventService needed to hook up events!
    function ProvidersController($log, $scope, $location, _, AuthService, RateEx, SupportedDestinations, RateExEvents) {

        var vm = this;

        this.login = function (rateCard) {
            AuthService.login(rateCard.name);
        };

        $scope.$on('auth:login', function (e, data) {
            //seedHash: "0xd0dbfdf2116fdf641f0d57b63152d482ded250d55c959dc02af0877ae91c1734"
            //address: "0xad24121d9a822a9b54ebb386bbcfea577663800a"
            $location.path('/provider-manage/' + data.seedHash + '/' + data.address);
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