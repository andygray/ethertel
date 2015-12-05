(function () {

    'use strict';

    mbApp.controllers.controller('PayphoneController', PayphoneController);

    // EventService needed to hook up events!
    function PayphoneController($log, $rootScope, $scope, AuthService, RateEx, SupportedDestinations, SupportedRateCards, ContractService, EventService) {

        var vm = this;

        vm.isAnonymous = AuthService.isAnonymous();
        vm.address = AuthService.getAddress();

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
                        rateCard: res.rateCard,
                        rate: res.rate,
                        quality: res.quality
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

        // get my calls from event on the block chain
        vm.attemptedCalls = [];
        var event = ContractService.RateEx().original.AddCallTx({}, {fromBlock: 0, toBlock: 'latest'});
        event.watch(function (error, result) {
            if (!error) {
                //console.log(result.args);
                if (result.args.caller === vm.address) {
                    vm.attemptedCalls.push({
                        caller: result.args.caller,
                        countryCode: result.args.countryCode && result.args.countryCode.toNumber(),
                        telephoneNumber: result.args.telephoneNumber && result.args.telephoneNumber.toNumber(),
                        rate: result.args.rate && result.args.rate.toNumber(),
                        timestamp: result.args.timestamp && result.args.timestamp.toNumber(),
                        rateCard: result.args.rateCard
                    });
                }
            }
        });

        vm.completedCalls = [];
        var event = ContractService.RateEx().original.CompletedCallTx({}, {fromBlock: 0, toBlock: 'latest'});
        event.watch(function (error, result) {
            if (!error) {
                //console.log(result.args);
                if (result.args.caller === vm.address) {
                    vm.completedCalls.push({
                        caller: result.args.caller,
                        countryCode: result.args.countryCode && result.args.countryCode.toNumber(),
                        telephoneNumber: result.args.telephoneNumber && result.args.telephoneNumber.toNumber(),
                        rate: result.args.rate && result.args.rate.toNumber(),
                        timestamp: result.args.timestamp && result.args.timestamp.toNumber(),
                        rateCard: result.args.rateCard,
                        amountInWei: result.args.timestamp && result.args.amountInWei.toNumber(),
                        callInSeconds: result.args.timestamp && result.args.callInSeconds.toNumber(),
                        costInWei: result.args.timestamp && result.args.costInWei.toNumber(),
                        refundInWei: result.args.timestamp && result.args.refundInWei.toNumber()
                    });
                }
            }
        });

        // auth magic
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
            event.stopWatching();
        });
    }

})();