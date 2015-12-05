(function () {

    'use strict';

    mbApp.controllers.controller('ProviderManageController', ProviderManageController);

    // EventService needed to hook up events!
    function ProviderManageController($log, $rootScope, $scope, $routeParams, _, AuthService, RateEx, SupportedDestinations, RateExEvents, ContractService) {

        var vm = this;

        console.log('$routeParams$', $routeParams);

        // TODO replace with no $cookies
        vm.loggedInProvider = {
            seedHash: $routeParams.seedHash,
            address: $routeParams.address
        };

        // get my calls from event on the block chain
        vm.attemptedCalls = [];
        vm.completedCalls = [];

        RateEx.getAllCallsForProvider(vm.loggedInProvider.address).then(function (getAllCalls) {
            console.log('getAllCalls', getAllCalls);

        });

        // FIXME = getBalance()

    }

})();