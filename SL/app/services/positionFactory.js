komFramISLApp.factory('positionFactory', ['$q',
    function positionFactory($q) {
        'use strict';
        var position = $q.defer();

        var setPosition = function (coord) {
            position.resolve(coord);
        };
        var getPosition = function () {
            if (!position.$resolved) {
                navigator.geolocation.getCurrentPosition(function (loc) {
                    position.resolve(loc.coords);
                });
            }
            return position;
        };

        return {
            setPosition: setPosition,
            getPosition: getPosition
        };
    }]);