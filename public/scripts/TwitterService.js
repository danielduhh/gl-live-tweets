angular.module('mapApp').service('TwitterService', function ($http) {

    var service = {};

    service.allTweets = {
        "type": "FeatureCollection",
        "features": []
    };

    service.createTweetGeoJSON = function (arr) {
        var features = [];
        var geojson = {
            "type": "FeatureCollection",
            "features": []
        };

        arr.forEach(function (obj) {
            var properties = {};

            var geoj = {
                "type": "Feature",
                "geometry": {},
                "properties": {}
            };

            Object.keys(obj).forEach(function (o) {
                properties[o] = obj[o];
            });

            geoj.properties = properties;

            if (obj.coordinates) {
                geoj.geometry = obj.coordinates;
                features.push(geoj);
            }

        });

        if (service.allTweets.features.length == 0) {
            service.allTweets.features = features;
        }
        geojson.features = features;

        sortTweetsByMostRecent();

        return geojson;

    };
    // only return unique ids
    service.filterGeoJSON = function (newdata) {

        //remove all duplicate data from new data
        service.allTweets.features.forEach(function (org) {
            var oid = org.properties.id;

            newdata.features = _.filter(newdata.features, function (n) {
                return n.properties.id !== oid;
            });
        });

        console.log('Number of new tweets: ' + newdata.features.length);

        // Add new data to running total
        newdata.features.forEach(function (obj) {
            service.allTweets.features.push(obj);
        });

        // add new features to original data
        //newdata.features.forEach(function (newd) {
        //    var properties = {};
        //
        //    var geoj = {
        //        "type": "Feature",
        //        "geometry": {},
        //        "properties": {}
        //    };
        //
        //    Object.keys(newd.properties).forEach(function (o) {
        //        properties[o] = newd.properties[o];
        //    });
        //
        //    geoj.properties = properties;
        //    geoj.geometry = newd.geometry;
        //
        //});

        sortTweetsByMostRecent();

        return newdata;
    };

    // create filter for batch of new data
    service.createLayerFilter = function (geojson) {

        var filter = ["any"];

        geojson.features.forEach(function (geo) {
            filter.push(["==", "id", geo.properties.id])
        });

        return filter;

    };

    service.getTweetsForLocation = function (geom) {
        var req = {
            method: 'POST',
            url: '/tweets',
            data: JSON.stringify(geom),
            headers: {'Content-Type': 'application/json'},
            cache: true
        };

        $http(req).success(function (data, status, headers, config) {
            console.log(data);
        }).error(function (data, status, headers, config) {
            console.log(data);
        });
    };

    service.getFlyToDict = function (){
        var dict = {};

        service.allTweets.features.forEach(function(obj){
            dict[obj.properties.id] ={
                center: [obj.geometry.coordinates[0], obj.geometry.coordinates[1]],
                zoom:15,
                bearing:27,
                pitch:20,
                curve: 1,
                speed:2
            };
        });

        return dict
    };

    function sortTweetsByMostRecent(){
        service.allTweets.features = service.allTweets.features.sort(function(a,b){return b.properties.timestamp_ms - a.properties.timestamp_ms});
    }

    return service;
});
