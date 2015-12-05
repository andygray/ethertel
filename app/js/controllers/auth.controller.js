(function() {

    'use strict';

    mbApp.controllers.controller('AuthController', ['$rootScope', '$scope', '$location', 'AuthService', AuthController]);


    function AuthController($rootScope, $scope, $location, authService) {

        _.extend($scope, {
            isAnonymous: authService.isAnonymous(),
            address: authService.getAddress(),
            balance: balance(),
            seed: '',
            login: login,
            logout: logout
        });

        function balance() {
            return authService.getBalance();
        }

        function login() {
            authService.login($scope.seed);
        }

        function logout() {
            authService.logout();
        }

        var loginListener = $rootScope.$on('auth:login', function(e, data) {
            _.extend($scope, {
                seed: '',
                address: data.address,
                isAnonymous: false
            });
        });
        
        var logoutListener = $rootScope.$on('auth:logout', function(e, data) {
            _.extend($scope, {
                address: '',
                isAnonymous: true
            });
        });

        $scope.$on('$destroy', function() {
            loginListener();
            logoutListener();
        });
    }

})();