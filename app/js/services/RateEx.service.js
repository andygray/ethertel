(function () {

    'use strict';

    mbApp.services.factory('RateEx', RateEx);

    function RateEx($q, $log, _, Web3Service, AppConfig, ContractService, AuthService) {

        return {
            getBalance: getBalance,
            rateCardCount: rateCardCount,
            getRateForRateCard: getRateForRateCard,
            getRateCardDetails: getRateCardDetails,
            getAllRateCard: getAllRateCard,
            getQualityForRateCard: getQualityForRateCard,
            lowestRateForCountryCode: lowestRateForCountryCode,
            quote: quote,
            addCall: addCall
        };

        function getBalance() {
            return ContractService.RateEx().with(defaultContext()).getBalance().then(function (res) {
                return res ? res : 0;
            });
        }

        function getRateForRateCard(rateCardAddress, countryCode) {
            return ContractService.RateEx().with(defaultContext()).getRateForRateCard(rateCardAddress, countryCode).then(function (res) {
                if (res) {
                    return res.toNumber();
                }
            });
        }

        function rateCardCount() {
            return ContractService.RateEx().with(defaultContext()).numberOfRateCards().then(function (res) {
                if (res) {
                    var count = res.toNumber();
                    $log.debug("Total Rate Card Count [%s]", count);
                    return count;
                }
            });
        }

        function getQualityForRateCard(rateCardAddress) {
            return ContractService.RateEx().with(defaultContext()).qualityForRateCard(rateCardAddress).then(function (res) {
                if (res) {
                    var quality = res.toNumber();
                    $log.debug("Rate Card [%s] Quality [%d]", rateCardAddress, quality);
                    return quality;
                }
            });
        }

        /**
         * Array of Object { address, name, domain, index }
         */
        function getAllRateCard() {
            return this.rateCardCount()
                .then(function (count) {

                    var resolves = _.chain(0).range(count)
                        .value()
                        .map(this.getRateCardDetails);

                    return $q.all(resolves)
                        .then(function (results) {
                            return _.map(results, function (rateCardRaw, index) {
                                // Translate it into something useful!
                                return {
                                    index: index,
                                    address: rateCardRaw[0],
                                    name: Web3Service.toAscii(rateCardRaw[1]),
                                    domain: Web3Service.toAscii(rateCardRaw[2])
                                }
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
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
                        rate: res[1].toNumber(),
                        rateCard: res[2],
                        quality: res[3].toNumber()
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