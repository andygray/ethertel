(function () {

    'use strict';

    mbApp.services.factory('RateEx', RateEx);

    function RateEx(AppConfig, ContractService, AuthService) {

        return {
            rateCardCount: rateCardCount,
            lowestRateForCountryCode: lowestRateForCountryCode,
            quote: quote,
            addCall: addCall
        };

        function rateCardCount() {
            return ContractService.RateEx().with(defaultContext()).numberOfRateCards().then(function (res) {
                if (res) {
                    return res.toNumber();
                }
            });
        }

        function lowestRateForCountryCode(countryCode) {
            return ContractService.RateEx().with(defaultContext()).lowestRateCard(countryCode).then(function (res) {
                if (res) {
                    return {
                        rate: res[0].toNumber(),
                        rateCard: res[1],
                        quality: res[2].toNumber()
                    };
                }
            });
        }

        function quote(countryCode, estimateInSecs) {
            return ContractService.RateEx().with(defaultContext()).quote(countryCode, estimateInSecs).then(function (res) {
                if (res) {
                    return {
                        estimatedAmountInWei: res[0].toNumber(),
                        rateCard: res[1]
                    };
                }
            });
        }

        function addCall(rateCard, countryCode, telephoneNumber, weiValue) {
            return ContractService.RateEx().with(defaultContextWithValue(weiValue))
                .addCall(rateCard, countryCode, telephoneNumber).then(function (res) {
                    if (res) {
                        console.log(res);
                        return true;
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

        function defaultContextWithValue(weiValue) {
            return {
                client: AuthService.getClientInfo(),
                tx: {
                    from: AuthService.getAddress(),
                    value: weiValue
                }
            };
        }
    }

})();