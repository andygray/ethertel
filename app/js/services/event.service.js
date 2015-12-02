(function() {

    'use strict';

    mbApp.services.factory('EventService', EventService);

    var RateExEvents = {
        AddRateCard: {
            namespace: 'RateEx:AddRateCard'
        },
        AddDestination: {
            namespace: 'RateEx:AddDestination'
        }
    };

    function EventService($rootScope, $log, ContractService) {

        function addEvents(events, contract) {
            _.each(events, function(metadata, type) {
                contract.on(type, function(err, resp) {
                    var args = resp.args;
                    var name = metadata.namespace;

                    $log.debug('event -', name, args);
                    $rootScope.$broadcast(name, args);
                });
            });
        }

        addEvents(RateExEvents, ContractService.RateEx());

        return {};
    }

})();