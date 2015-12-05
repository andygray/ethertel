(function () {

    'use strict';

    var RateExEvents = {
        AddRateCard: {
            namespace: 'RateEx:AddRateCard'
        },
        AddDestination: {
            namespace: 'RateEx:AddDestination'
        }
    };

    mbApp.services
        .constant('RateExEvents', RateExEvents)
        .factory('EventService', EventService);

    function EventService($rootScope, $log, ContractService) {

        function addEvents(events, contract) {
            _.each(events, function (metadata, type) {
                contract.on(type, function (err, resp) {
                    if (!err) {
                        var args = resp.args;
                        var name = metadata.namespace;

                        $log.debug('event -', name, args);
                        $rootScope.$broadcast(name, args);
                    }
                });
            });
        }

        addEvents(RateExEvents, ContractService.RateEx());

        return {};
    }

})();