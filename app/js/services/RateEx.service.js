(function() {

    'use strict';

    mbApp.services.factory('RateEx', RateEx);

    function RateEx(AppConfig, ContractService, AuthService) {

        return {
            rateCardCount: rateCardCount
        };

        function rateCardCount() {
            return ContractService.RateEx().with(defaultContext()).numberOfRateCards().then(function(res) {
                if (res) {
                    return res.toNumber();
                }
            });
        }

        function defaultContext() {
            return {
                client: AuthService.getClientInfo(),
                tx: {
                    from: AuthService.getAddress() || AppConfig.SU_ADDRESS
                }
            };
        }
    }

})();