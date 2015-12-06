(function () {

    'use strict';

    mbApp.controllers.controller('ProviderManageController', ProviderManageController);

    // EventService needed to hook up events!
    function ProviderManageController($log, $timeout, _, AuthService, RateEx, RateExEvents, ContractService) {

        var vm = this;

        vm.loggedInProvider = AuthService.getClientInfo();

        // get my calls from event on the block chain
        vm.attemptedCalls = [];
        vm.completedCalls = [];

        RateEx.getAllCallsForProvider(AuthService.getClientInfo().address).then(function (getAllCalls) {
            console.log('getAllCalls', getAllCalls);
            // TODO tmp set on completed
            vm.completedCalls = getAllCalls;
        });

        var loadedRateCards = [];
        RateEx.getAllRateCard().then(function (rateCards) {
            loadedRateCards = rateCards;
        });

        // FIXME This seems to not match as well....? something strange going on
        this.getPrettyRateCard = function (hash) {
            return _.get(_.find(loadedRateCards, {address: hash}), 'name', 'n/a');
        };

        // FIXME = TODO add - getBalance()

        this.validateCall = function (call) {
            console.log('validateCall', call);
        };

        this.completeCall = function (call, completedCallAmount) {
            console.log('completeCall', call, completedCallAmount);

        };

    }

})();