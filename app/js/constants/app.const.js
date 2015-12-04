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
    // FIXME - this have name - how to get this without hard coding it?
    // FIXME - does this require a new property on RateCard i.e. RateCard(bytes32 _name, bytes32 _domain, bytes32 _humanReadable)
    .constant('SupportedRateCards', {
        '0x17956ba5f4291844bc25aedb27e69bc11b5bda39': 'RateCardAlpha',
        '0xdf315f7485c3a86eb692487588735f224482abe3': 'RateCardBeta',
        '0xaefa01276783e1436e5b461c099edccb0448dcf6': 'XYZ',
        '0x06b179aabf198ced0f98c8ceca905a920a137ef4': 'GLTD'
    });