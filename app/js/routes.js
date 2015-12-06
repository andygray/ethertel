(function () {
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
            .when('/payphone', {
                templateUrl: 'template/payphone.html',
                controller: 'PayphoneController',
                controllerAs: 'PayphoneController'
            })
            .when('/providers', {
                templateUrl: 'template/providers.html',
                controller: 'ProvidersController',
                controllerAs: 'ProvidersController'
            })
            .when('/provider-manage', {
                templateUrl: 'template/provider-manage.html',
                controller: 'ProviderManageController',
                controllerAs: 'ProviderManageController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

})();