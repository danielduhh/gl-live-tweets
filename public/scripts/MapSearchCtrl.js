angular.module('mapApp').controller('mapSearch', function($scope,$http,$q,TwitterService,MapService){

    $scope.searchQuery = '';
    $scope.googleResults = {};

    // fly to location and create event that will continuously stream tweets
    $scope.goToLocation = function(obj){
        $scope.map.flyTo({center:[obj.geometry.coordinates[0],obj.geometry.coordinates[1]], zoom:12});
        TwitterService.getTweetsForLocation(obj);
        $scope.hideResults = true;
    };

    // update text search upon place selection
    $scope.changeSearchText = function(text){
        $scope.searchQuery = text;
    };

    // get geocode date from google
    $scope.getGoogleSearchData = function(){
        MapService.googleGeocode($scope.searchQuery)
            .then(function(res){
                $scope.googleResults = res;
            })
    };

    // get geocode data from open cage
    $scope.getOpenCageSearchData = function() {
        MapService.openCageGeocode($scope.searchQuery)
            .then(function(res){
                $scope.openCageResults = res;
                $scope.hideResults = false;
            });
    };

});
