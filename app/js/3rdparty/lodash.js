'use strict';

(function () {

    //Make it angular injectable
    mbApp
        .factory('_', ['$window',
            function ($window) {

                /**
                 * Mixin more methods to lodash
                 */
                _.mixin((function () {
                    return {

                        /**
                         * Is the object defined
                         * @return {*} the object to check
                         */
                        isDefined: function (object) {
                            return !_.isUndefined(object);
                        },

                        /**
                         * Is the object null or undefined
                         * @return {*} the object to check
                         */
                        isNullOrUndefined: function (object) {
                            return _.isUndefined(object) || _.isNull(object);
                        },

                        /**
                         * Cleans a given object by remove null properties form it
                         *
                         * @param object
                         * @return {*}
                         */
                        clean: function (object) {
                            for (var i in object) {
                                if (object[i] === null || object[i] === undefined) {
                                    delete object[i];
                                }
                            }
                            return object;
                        }

                    };
                }()));

                // place lodash include before angular
                return $window._;
            }
        ])
        // use in views, ng-repeat="x in _.range(3)"
        .run(function ($rootScope) {
            $rootScope._ = window._;
        });

})();