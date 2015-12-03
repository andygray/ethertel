'use strict';

mbApp.constants
    .constant('ContractConfig', {
        nameReg: {
            address: '0x084f6a99003dae6d3906664fdbf43dd09930d0e3',
            abi: [{
                "constant": false,
                "inputs": [],
                "name": "kill",
                "outputs": [],
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "name",
                    "type": "bytes32"
                }],
                "name": "addressOf",
                "outputs": [{
                    "name": "addr",
                    "type": "address"
                }],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{
                    "name": "name",
                    "type": "bytes32"
                }],
                "name": "register",
                "outputs": [],
                "type": "function"
            }, {
                "constant": false,
                "inputs": [],
                "name": "unregister",
                "outputs": [],
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{
                    "name": "addr",
                    "type": "address"
                }],
                "name": "nameOf",
                "outputs": [{
                    "name": "name",
                    "type": "bytes32"
                }],
                "type": "function"
            }]
        },
        RateEx: {
            address: '0x086ca7abad7f9773db72e2efd83dd22f5f408862',
            namespace: 'ethertel/rate-ex',
            abi: [
                {
                    "constant": false,
                    "inputs": [],
                    "name": "nameRegAddress",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [],
                    "name": "getBalance",
                    "outputs": [
                        {
                            "name": "bal",
                            "type": "uint256"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "countryCode",
                            "type": "uint256"
                        }
                    ],
                    "name": "addDestination",
                    "outputs": [],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "numberOfCalls",
                    "outputs": [
                        {
                            "name": "count",
                            "type": "uint256"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "numberOfRateCards",
                    "outputs": [
                        {
                            "name": "count",
                            "type": "uint256"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "countryCode",
                            "type": "uint256"
                        },
                        {
                            "name": "timeInSecs",
                            "type": "uint256"
                        }
                    ],
                    "name": "quote",
                    "outputs": [
                        {
                            "name": "amountInWei",
                            "type": "uint256"
                        },
                        {
                            "name": "lowestRateCardAddress",
                            "type": "address"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "rateCardAddress",
                            "type": "address"
                        }
                    ],
                    "name": "addRateCard",
                    "outputs": [],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "rateCard",
                            "type": "address"
                        }
                    ],
                    "name": "qualityForRateCard",
                    "outputs": [
                        {
                            "name": "qualityRating",
                            "type": "uint256"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "destinations",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "cHash",
                            "type": "bytes32"
                        },
                        {
                            "name": "callInSeconds",
                            "type": "uint256"
                        }
                    ],
                    "name": "completeCall",
                    "outputs": [],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "cHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "validateCall",
                    "outputs": [
                        {
                            "name": "maxInSeconds",
                            "type": "uint256"
                        },
                        {
                            "name": "countryCode",
                            "type": "uint256"
                        },
                        {
                            "name": "amountInWei",
                            "type": "uint256"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "name",
                            "type": "bytes32"
                        }
                    ],
                    "name": "named",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "newOwner",
                            "type": "address"
                        }
                    ],
                    "name": "changeOwner",
                    "outputs": [],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "lengthOfTotalCalls",
                    "outputs": [
                        {
                            "name": "count",
                            "type": "uint256"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "rateCards",
                    "outputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "rateCard",
                            "type": "address"
                        },
                        {
                            "name": "countryCode",
                            "type": "uint256"
                        },
                        {
                            "name": "telephoneNumber",
                            "type": "uint256"
                        }
                    ],
                    "name": "addCall",
                    "outputs": [
                        {
                            "name": "callHash",
                            "type": "bytes32"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "calls",
                    "outputs": [
                        {
                            "name": "caller",
                            "type": "address"
                        },
                        {
                            "name": "rateCard",
                            "type": "address"
                        },
                        {
                            "name": "countryCode",
                            "type": "uint256"
                        },
                        {
                            "name": "telephoneNumber",
                            "type": "uint256"
                        },
                        {
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "name": "amountInWei",
                            "type": "uint256"
                        },
                        {
                            "name": "rate",
                            "type": "uint256"
                        },
                        {
                            "name": "maxInSeconds",
                            "type": "uint256"
                        },
                        {
                            "name": "callInSeconds",
                            "type": "uint256"
                        },
                        {
                            "name": "costInWei",
                            "type": "uint256"
                        },
                        {
                            "name": "refundInWei",
                            "type": "uint256"
                        },
                        {
                            "name": "completed",
                            "type": "bool"
                        },
                        {
                            "name": "quality",
                            "type": "uint256"
                        },
                        {
                            "name": "callHash",
                            "type": "bytes32"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "countryCode",
                            "type": "uint256"
                        }
                    ],
                    "name": "lowestRateCard",
                    "outputs": [
                        {
                            "name": "lowestRate",
                            "type": "uint256"
                        },
                        {
                            "name": "lowestRateCardAddress",
                            "type": "address"
                        },
                        {
                            "name": "quality",
                            "type": "uint256"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "index",
                            "type": "uint256"
                        }
                    ],
                    "name": "getRateCardDetails",
                    "outputs": [
                        {
                            "name": "cardAddress",
                            "type": "address"
                        },
                        {
                            "name": "name",
                            "type": "bytes32"
                        }
                    ],
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "rateCardsMap",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "type": "function"
                },
                {
                    "inputs": [],
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "name": "owner",
                            "type": "address"
                        }
                    ],
                    "name": "RateExInit",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "name": "rateCardAddress",
                            "type": "address"
                        }
                    ],
                    "name": "AddRateCard",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "name": "destination",
                            "type": "uint256"
                        }
                    ],
                    "name": "AddDestination",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "name": "caller",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "rateCard",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "countryCode",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "telephoneNumber",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "amountInWei",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "rate",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "maxInSeconds",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "callHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "AddCallTx",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "name": "caller",
                            "type": "address"
                        }
                    ],
                    "name": "NotEnoughEtherCallTx",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": false,
                            "name": "caller",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "rateCard",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "countryCode",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "telephoneNumber",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "amountInWei",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "rate",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "callInSeconds",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "costInWei",
                            "type": "uint256"
                        },
                        {
                            "indexed": false,
                            "name": "refundInWei",
                            "type": "uint256"
                        }
                    ],
                    "name": "CompletedCallTx",
                    "type": "event"
                }
            ]
        }
    });