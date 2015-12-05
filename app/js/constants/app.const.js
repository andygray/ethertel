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
    ]);