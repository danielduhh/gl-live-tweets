angular.module('mapApp').service('MapService', function($http,$q,config) {

    var service = {};

    /**
     * Google Geocoder
     */
    service.googleGeocode = function (query){
        var deferred = $q.defer();

        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURI(query);

        $http.get(url,{ cache: true }).
            then(function(response){

                if (response.data && response.data.error) {
                    deferred.reject(response.data.error);
                }

                deferred.resolve(response.data);

            }, function(err){
                deferred.reject(err);
            });

        return deferred.promise;

    };

    /**
     * Open Cage Geocoder
     */

    service.openCageGeocode = function (query){
        var deferred = $q.defer();

        var url = 'https://api.opencagedata.com/geocode/v1/geojson?q=' + encodeURI(query) + '&key=' + config["openCage-key"] + '&pretty=1';

        $http.get(url,{ cache: true }).
            then(function(response){

                if (response.data && response.data.error) {
                    deferred.reject(response.data.error);
                }

                deferred.resolve(response.data);

            }, function(err){
                deferred.reject(err);
            });

        return deferred.promise;
    };

    return service;
});

