(function () {

    'use strict';

    mbApp.controllers.controller('ProviderManageController', ProviderManageController);

    // EventService needed to hook up events!
    function ProviderManageController($log, _, AuthService, RateEx, RateExEvents, ContractService) {

        var vm = this;

        vm.loggedInProvider = AuthService.getClientInfo();

        // get my calls from event on the block chain
        vm.attemptedCalls = [];
        vm.completedCalls = [];

        RateEx.getAllCallsForProvider(AuthService.getClientInfo().address).then(function (getAllCalls) {
            console.log('getAllCalls', getAllCalls);
            // TODO tmp set on attempted
            vm.attemptedCalls = getAllCalls;
        });

        // FIXME = getBalance()

    }

})();