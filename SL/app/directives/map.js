komFramISLApp.directive('map', ['positionFactory', function (positionFactory) {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/map.html',
        link: function link(scope, el, attrs) {
            var map = L.map('map').setView(new L.LatLng(59.32, 18.06), 12);
            var osm = '//{s}.tiles.mapbox.com/v3/examples.map-i87786ca/{z}/{x}/{y}.png';
            var symbol = L.marker(getInitialCenterPosition(), {
                draggable: true,
                tooltip: 'Här är du',
                riseOnHover: true
            });
            var setView = function (coord) {
                if (coord.coords) { coord = coord.coords;}
                var locPoint = new L.LatLng(coord.latitude, coord.longitude)
                map.setView(locPoint);
                symbol.setLatLng(locPoint);
                symbol.addTo(map);
                blockSetView = true;
            };

            function getInitialCenterPosition() {

                //return [59, 15];


                //var lat = $scope.markercoords.Latitud.value;
                //var lng = $scope.markercoords.Longitud.value;

                //return [lat, lng];
            }
            var taco = positionFactory.getPosition()
            taco.promise.then(function (data) {
                setView(data);
            });
            L.tileLayer(osm, {
                minZoom: 9,
                maxZoom: 15
            }).addTo(map);




            //var map = L.map('map').setView(new L.LatLng(59.32, 18.06), 4);
            //var osm = 'http://static.hitta.se/tile/v3/0/{z}/{x}/{y}';

            //L.tileLayer(osm,
            //    {}
            //).addTo(map);
        }
    }
}]);