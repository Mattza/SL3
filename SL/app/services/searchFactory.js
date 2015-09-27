komFramISLApp.factory('searchFactory', ['$http',

    function searchFactory($http) {
        'use strict';

        var searchResult;
        var getDotUrl = function (dot, prefix) {
            var ret = '&';
            if (dot.type === 0) {
                ret += prefix + 'Id=' + dot.str;
            } else if (dot.type === 1) {
                ret += prefix + 'CoordLat=' + dot.coord.latitude +
                    '&' + prefix + 'CoordLong=' + dot.coord.longitude +
                    '&' + prefix + 'CoordName=Min position'
            }
            return ret;
        }

        var searchFn = function (searchObj, position, successCb, errorCb, append) {
            var taco = {};
            taco.originId = getDotUrl(searchObj.from, 'origin')
            taco.destId = getDotUrl(searchObj.to, 'dest');
            if (searchObj.time) {
                taco.time = '&time=' + searchObj.time;
            }
            if (searchObj.date) {
                taco.date = '&date=' + searchObj.date;

            }
            var url = '/api/SL';
            var shObj = searchObj;

            $http.post(url,taco)
                .success(function (data, status, headers, config) {
                    if (data.TripList.errorCode) {
                        errorCb();
                    } else {
                        _.each(data.TripList.Trip, function (trip) {

                            if (!angular.isArray(trip.LegList.Leg)) {
                                var temp = trip.LegList.Leg;
                                trip.LegList.Leg = [temp];
                            }
                            trip.StartTime = trip.LegList.Leg[0].Origin.time;
                            trip.StartDate = trip.LegList.Leg[0].Origin.date;
                            trip.ArrivalTime = trip.LegList.Leg[trip.LegList.Leg.length - 1].Destination.time;
                        });
                        if (append) {
                            _.each(data.TripList.Trip, function (trip) {
                                searchResult.TripList.Trip.push(trip);
                            })
                        } else {
                            searchResult = data;
                        }
                        data.searchObj = shObj;
                        successCb(data);
                    }

                })
                .error(function (data) {
                    errorCb();
                });
        };

        return {
            searchFn: searchFn,
            getSearchResult: function () {
                return searchResult;
            }
        };
            }]);