'use strict';

mbApp.constants
    .constant('AppConfig', {
        SU_ADDRESS: '0xdedb49385ad5b94a16f236a6890cf9e0b1e30392'
    })
    // temp hard code
    .constant('SupportedDestinations', [
        {
            name: 'United Kingdom',
            countryCode: 44
        },
        {
            name: 'USA',
            countryCode: 1
        },
        {
            name: 'India',
            countryCode: 91
        }
    ])
    // temp hard code
    .constant('SupportedRateCards', {
        '0x17956ba5f4291844bc25aedb27e69bc11b5bda39': 'RateCardAlpha',
        '0xdf315f7485c3a86eb692487588735f224482abe3': 'RateCardBeta'
    });