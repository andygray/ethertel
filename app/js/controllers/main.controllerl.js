(function() {

    'use strict';

    mbApp.controllers.controller('MainController', ['$scope', '$location', 'AuthService', 'Web3Config', MainController]);

    function MainController($scope, $location, authService, Web3Config) {

        var vm = this;

        vm.http_provider = Web3Config.PROVIDER;
    }

})();