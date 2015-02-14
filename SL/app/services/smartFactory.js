komFramISLApp.factory('smartFactory', ['$localStorage',
        function smartFactory($localStorage) {
        'use strict';

        var test1 = [];

        var update = function (searchStr, storage,score) {
            searchStr = searchStr.toLowerCase();
            searchStr = searchStr.charAt(0).toUpperCase() + searchStr.slice(1);
            var item = _.find(storage, function (item) {
                return item.station === searchStr;
            });
            if (item) {
                item.counter++;
            } else {
                storage.push({
                    station: searchStr,
                    counter: score
                });
            }
        };

        var fixCaseMap = function (array) {
            return _.map(array, function (item) {
                var lower = item.station.toLowerCase();
                item.station = lower.charAt(0).toUpperCase() + lower.slice(1);
            });

        }
        var fixData = function () {
            var dataVersion = $localStorage.dataVersion;
            if (!dataVersion) {
                fixCaseMap($localStorage.from);
                fixCaseMap($localStorage.to);
                $localStorage.dataVersion = 0.1;
            }
        }

        var atSearch = function (search) {
            if (!$localStorage.from) {
                $localStorage.from = [];
            }
            if (!$localStorage.to) {
                $localStorage.to = [];
            }
            if (search.from.type === 0) {
                update(search.from.str, $localStorage.from, 1);
                update(search.from.str, $localStorage.to, 0.1);
            }
            if (search.from.type === 0) {
                update(search.to.str, $localStorage.to, 1);
                update(search.to.str, $localStorage.from, 0.1);
            }
        }

        return {
            stationFrom: $localStorage.from,
            stationTo: $localStorage.to,
            atSearch: atSearch,
            history: test1,
            fixData:fixData,
        };
}]);