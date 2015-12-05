(function () {

    'use strict';

    mbApp.controllers.controller('ProviderManageController', ProviderManageController);

    // EventService needed to hook up events!
    function ProviderManageController($log, $rootScope, $scope, $routeParams, _, AuthService, RateEx, SupportedDestinations, RateExEvents) {

        var vm = this;

        console.log('$routeParams$', $routeParams);

    }

})();