(function () {

    'use strict';

    mbApp.controllers.controller('ProviderManageController', ProviderManageController);

    // EventService needed to hook up events!
    function ProviderManageController($log, $timeout, _, AuthService, RateEx, RateExEvents, ContractService, Web3Service) {

        var vm = this;

        vm.loggedInProvider = AuthService.getClientInfo();

        // get my calls from event on the block chain
        vm.attemptedCalls = [];
        vm.completedCalls = [];

        vm.pageConfig = {
            loadingCalls: true
        };

        $timeout(function () {
            RateEx.getAllCallsForProvider(AuthService.getClientInfo().address).then(function (getAllCalls) {
                console.log('getAllCalls', getAllCalls);
                // TODO tmp set on completed
                vm.completedCalls = getAllCalls;
                vm.pageConfig.loadingCalls = false;
            });
        }, 1000);

        var loadedRateCards = [];
        RateEx.getAllRateCard().then(function (rateCards) {
            loadedRateCards = rateCards;
        });

        // FIXME This seems to not match as well....? something strange going on
        this.getPrettyRateCard = function (hash) {
            return _.get(_.find(loadedRateCards, {address: hash}), 'name', 'n/a');
        };

        // FIXME = TODO add - getBalance()
        this.balance = function (address) {
            // beta
            Web3Service.eth.getBalance('0xdf315f7485c3a86eb692487588735f224482abe3').toNumber();
        };

        this.validateCall = function (call) {

            // force it
            AuthService.login('beta');

            RateEx.validateCall(call.callHash).then(function (res) {
                console.log('validateCall', call, res);
                call.validatedData = res;
            });
        };

        this.completeCall = function (call, completedCallAmount) {

            // force it
            AuthService.login('beta');

            RateEx.completeCall(call.callHash, completedCallAmount).then(function (res) {
                console.log('completeCall', call, completedCallAmount, res);
                call.completedData = res;
            });
        };

    }

})();