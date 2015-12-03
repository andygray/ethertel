(function () {

    'use strict';

    mbApp.services.factory('RateEx', RateEx);

    function RateEx($q, _, AppConfig, ContractService, AuthService) {

        return {
            rateCardCount: rateCardCount,
            getRateCardDetails: getRateCardDetails,
            getAllRateCard: getAllRateCard,
            lowestRateForCountryCode: lowestRateForCountryCode,
            quote: quote,
            addCall: addCall,
            exchangeBalance: exchangeBalance
        };

        function exchangeBalance() {
            return ContractService.RateEx().with(defaultContext()).getBalance().then(function (res) {
                if (res) {
                    return res.toNumber();
                }
            });
        }

        function rateCardCount() {
            return ContractService.RateEx().with(defaultContext()).numberOfRateCards().then(function (res) {
                if (res) {
                    return res.toNumber();
                }
            });
        }

        /**
         * Produces pair's of
         * <code>
         *     bytes32 public name;
         *     bytes32 public domain;
         *     mapping (uint => uint) public rates;
         * </code>
         */
        function getAllRateCard() {
            return this.rateCardCount()
                .then(function (count) {
                    console.log("Count", count);

                    var resolves =
                        _.chain(0).range(count)
                            .value()
                            .map(this.getRateCardDetails);

                    return $q.all(resolves)
                        .then(function (results) {
                            console.log(results);
                            return results;
                        })
                        .catch(function (error) {
                            console.error(error);
                            return [];
                        })
                }.bind(this));
        }

        function getRateCardDetails(index) {
            return ContractService.RateEx().with(defaultContext()).getRateCardDetails(index).then(function (res) {
                if (res) {
                    return res;
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
                        return res;
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