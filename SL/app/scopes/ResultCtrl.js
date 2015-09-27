komFramISLApp.controller('ResultCtrl', ['searchFactory', '$state',
    function (searchFactory, $state) {
        var result = this;
        result.loadingMore = false;
        result.home = function () {
            $state.go('index');
        }
        result.result = searchFactory.getSearchResult();
        if (!result.result) {
            result.home();
        }

        result.more = function () {
            searchFactory.searchFn({
                from: result.result.searchObj.from,
                to: result.result.searchObj.to,
                time: addMinutes(_.last(result.result.TripList.Trip).StartTime,1),
                date: _.last(result.result.TripList.Trip).StartDate,

            }, undefined, successCb, errorCb, true);
            result.loadingMore = true;
        }

        var successCb = function (data) {
            result.loadingMore = false;
        }
        var errorCb = function () {
            result.loadingMore = false;
        }


        var getMorezTime = function () {
            var trips = result.result.TripList.Trip;
            return trips[trips.length - 1].StartTime;
        }
        function addMinutes(time/*"hh:mm"*/, minsToAdd/*"N"*/) {
            function z(n) {
                return (n < 10 ? '0' : '') + n;
            }
            var bits = time.split(':');
            var mins = bits[0] * 60 + (+bits[1]) + (+minsToAdd);

            return z(mins % (24 * 60) / 60 | 0) + ':' + z(mins % 60);
        }
}]);