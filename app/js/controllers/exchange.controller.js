(function () {

    'use strict';

    mbApp.controllers.controller('ExchangeController', ExchangeController);

    // EventService needed to hook up events!
    function ExchangeController($log, $rootScope, $scope, _, AuthService, RateEx, SupportedDestinations, EventService) {

        var vm = this;

        vm.isAnonymous = AuthService.isAnonymous();

        RateEx.rateCardCount().then(function (res) {
            vm.rateCardCount = res;
            $log.debug('Number of rate cards', vm.rateCardCount);
        });

        RateEx.getBalance().then(function (balance) {
            console.log('balance', balance);
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

        vm.destinations = [];
        _.forEach(SupportedDestinations, function (dest) {
            RateEx.lowestRateForCountryCode(dest.countryCode).then(function (res) {
                $log.debug('Rate for ' + dest.name, res.rate);
                dest.rate = res.rate;
                dest.rateCard = res.rateCard;
                dest.quality = res.quality;
                vm.destinations.push(dest);
            });
        });

        vm.getPrettyRateCard = function (hash) {
            return _.get(_.find(vm.rateCards, {address: hash}), 'name', 'n/a');
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