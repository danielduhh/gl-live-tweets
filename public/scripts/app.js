var mapApp = angular.module('mapApp',
    ['ngMaterial'])
    .controller('map', function ($scope, $http, $rootScope, MapService, socket, TwitterService, config) {

        var data;
        var version = 0; // version of twitter response
        var randomColor;

        mapboxgl.accessToken = config["gl-accessToken"];

        var map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v8',
            center: [-122.3331, 47.6097], //seattle
            zoom: 10 // starting zoom
        });

        // set global map variable
        $scope.map = map;

        map.addControl(new mapboxgl.Navigation({position: 'bottom-right'}));

        /**
         * Listen for twitter event emiited by socket.io
         */
        socket.on('tweet', function (response) {
            $scope.$apply(function () {

                // 1. if no new source, add one
                // 2. if no data, GeoJSON from tweet response
                // 3. Create filter using tweet id
                // 4. Add layer with version id, with filter
                // 5. New data ---
                // 6. Append new data to features
                // 7. New data has new layer with version id and new filter
                // 8. Every time new data comes in, add new layer with random color and new filter


                // not perfect, gl throws error 'Cannot read property '0' of null' error for non existing colors, draws them in black
                do {
                    randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                }
                while (randomColor.length<7);

                // geojson for new data
                var geojson = TwitterService.createTweetGeoJSON(response.statuses);

                // if data exists add to it
                if (data) {
                    geojson = TwitterService.filterGeoJSON(geojson);
                }

                // if no new source, add one
                if(!map.getSource('tweets')){
                    var sourceObj = new mapboxgl.GeoJSONSource();
                    map.addSource('tweets', sourceObj); // add
                }

                // only add data if has features
                if(geojson.features.length > 0) {
                    // add new data to source
                    map.getSource('tweets').setData(TwitterService.allTweets);

                    // increment source/layer number
                    version += 1;
                    data = geojson;
                    $rootScope.$broadcast('new-tweets', data);
                    var layerFilter = TwitterService.createLayerFilter(geojson);

                    try {
                        // add layer with filter to map
                        map.addLayer({
                            "id": "tweet-v" + version,
                            "type": "circle",
                            "source": 'tweets',
                            "interactive": true,
                            "layout": {
                                "visibility": "visible"
                            },
                            "paint": {
                                "circle-color": randomColor,
                                "circle-blur ": 1,
                                "circle-radius": 4,
                                "circle-opacity": .7
                            },
                            "filter":layerFilter
                        })
                    } catch(err){
                        console.log(randomColor);
                        console.log(err);
                    }

                }
            });
        });

        map.on('style.load', function () {

        });

        // on cursor move
        map.on('mousemove', function (e) {
            map.featuresAt(e.point, {layer: 'parking', radius: 10}, function (err, features) {
                map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
            });
        });

        // show tweets when point is clicked
        map.on('click', function (e) {

            map.featuresAt(e.point, {layers: "parking", radius: 10, includeGeometry: true}, function (err, features) {

                if (err) {
                    throw err
                }

                if (features.length) {

                    var html = '';

                    Object.keys(features[0].properties).forEach(function (key) {
                        html += "<div>" + key + ": " + features[0].properties[key] + "</div>"
                    });

                    new mapboxgl.Popup()
                        .setLngLat(features[0].geometry.coordinates)
                        .setText(features[0].properties.text)
                        .addTo(map);
                }

            });
        });


    });