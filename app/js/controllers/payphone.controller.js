(function () {

    'use strict';

    mbApp.controllers.controller('PayphoneController', PayphoneController);

    // EventService needed to hook up events!
    function PayphoneController($log, $rootScope, $scope, AuthService, RateEx, SupportedDestinations, SupportedRateCards, EventService) {

        var vm = this;

        vm.telephoneNumber = '';

        vm.destinations = SupportedDestinations;

        vm.myQuote = undefined;
        vm.callQuoting = false;
        vm.callAdding = false;
        vm.callAdded = false;

        vm.quote = function () {
            vm.callQuoting = true;
            if (vm.countryCode && vm.estimatedMins) {

                RateEx.quote(vm.countryCode, vm.estimatedMins * 60).then(function (res) {
                    $log.debug('Quote for ' + vm.countryCode, res.estimatedAmountInWei);

                    vm.myQuote = {};
                    _.extend(vm.myQuote, {
                        estimatedAmountInWei: res.estimatedAmountInWei,
                        rateCard: res.rateCard
                    });

                    vm.weiValue = res.estimatedAmountInWei;
                    vm.callQuoting = false;
                });
            }
        };

        vm.keypad = function (num) {
            vm.telephoneNumber = vm.telephoneNumber + num;
        };

        vm.getPrettyRateCard = function (hash) {
            return SupportedRateCards[hash];
        };

        vm.addCall = function () {
            vm.callAdding = true;
            RateEx.addCall(vm.myQuote.rateCard, vm.countryCode, vm.telephoneNumber, vm.weiValue)
                .then(function (res) {
                    vm.callAdded = true;
                    vm.callAdding = false;
                    vm.receipt = res;
                })
        };

        // auth magic

        vm.isAnonymous = AuthService.isAnonymous();
        vm.address = AuthService.getAddress();

        vm.login = function () {
            AuthService.login(vm.seed);
        };

        var loginListener = $rootScope.$on('auth:login', function (e, data) {
            _.extend(vm, {
                seed: '',
                address: data.address,
                isAnonymous: false
            });
        });

        var logoutListener = $rootScope.$on('auth:logout', function (e, data) {
            _.extend(vm, {
                address: '',
                isAnonymous: true
            });
        });

        $scope.$on('$destroy', function () {
            loginListener();
            logoutListener();
        });
    }

})();