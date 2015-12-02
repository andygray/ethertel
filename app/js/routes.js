(function() {
    'use strict';

    angular
        .module('mbApp')
        .config(config);

    function config($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'template/main.html',
                controller: 'MainController',
                controllerAs: 'MainController'
            })
            .when('/exchange', {
                templateUrl: 'template/exchange.html',
                controller: 'ExchangeController',
                controllerAs: 'ExchangeController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();