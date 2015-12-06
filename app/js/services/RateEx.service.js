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
            addCall: addCall,
            getAllCalls: getAllCalls,
            getAllCallsForProvider: getAllCallsForProvider,
            getCallDetailsForIndex: getCallDetailsForIndex,
            numberOfCalls: numberOfCalls,
            completeCall: completeCall,
            validateCall: validateCall
        };

        function getBalance() {
            return ContractService.RateEx().with(defaultContext()).getBalance().then(function (res) {
                // TODO andy - what should this be? - value = 0xffeab73bc133387b122fbb83604f34acf915ac8ce74d5cfb86ad66fd403feb64
                return res ? res : 0;
            });
        }

        function getAllCallsForProvider(rateCardAddress) {
            return this.getAllCalls().then(function (allCalls) {
                // TODO this should use {rateCard: rateCardAddress} - could be a bug?
                return _.filter(allCalls, {caller: rateCardAddress});
            });
        }

        function validateCall(cHash) {
            return ContractService.RateEx().with(defaultContext()).validateCall(cHash).then(function (res) {
                // returns = uint maxInSeconds, uint countryCode, uint amountInWei
                return {
                    maxInSeconds: res[0].toNumber(),
                    countryCode: res[1].toNumber(),
                    amountInWei: res[2].toNumber()
                };
            });
        }

        function completeCall(cHash, callInSeconds) {
            return ContractService.RateEx().with(defaultContext()).completeCall(cHash, callInSeconds).then(function (res) {
                return res;
            });
        }

        function getAllCalls() {
            return this.numberOfCalls()
                .then(function (count) {

                    var resolves = _.chain(0).range(count)
                        .value()
                        .map(this.getCallDetailsForIndex);

                    return $q.all(resolves)
                        .then(function (results) {
                            return _.map(results, function (rawCall, index) {
                                return {
                                    index: index,
                                    caller: rawCall[0],
                                    rateCard: rawCall[1],
                                    countryCode: rawCall[2].toNumber(),
                                    telephoneNumber: rawCall[3].toNumber(),
                                    timestamp: rawCall[4].toNumber(),
                                    amountInWei: rawCall[5].toNumber(),
                                    rate: rawCall[6].toNumber(),
                                    maxInSeconds: rawCall[7].toNumber(),
                                    callInSeconds: rawCall[8].toNumber(),
                                    costInWei: rawCall[9].toNumber(),
                                    refundInWei: rawCall[10].toNumber(),
                                    completed: rawCall[11],
                                    quality: rawCall[12].toNumber(),
                                    callHash: rawCall[13]
                                };
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                            return [];
                        })

                }.bind(this));
        }

        function getCallDetailsForIndex(index) {
            return ContractService.RateEx().with(defaultContext()).calls(index).then(function (res) {
                return res;
            });
        }

        function numberOfCalls() {
            return ContractService.RateEx().with(defaultContext()).numberOfCalls().then(function (res) {
                if (res) {
                    return res.toNumber();
                }
            });
        }

        function lengthOfTotalCalls() {
            return ContractService.RateEx().with(defaultContext()).lengthOfTotalCalls().then(function (res) {
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