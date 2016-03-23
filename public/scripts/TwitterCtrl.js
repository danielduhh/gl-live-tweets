mapApp.controller('TweetsCtrl', function($scope,$http,$templateCache, $rootScope, $mdToast, TwitterService, $mdSidenav){

    $scope.timeLine = false;
    $scope.tweets = {};
    $scope.searchQuery = '';
    var activeChapterName;

    // Listen for new tweets and add to timeline dive
    $scope.$on('new-tweets', function(event, data){
        $scope.tweets = TwitterService.allTweets;

        $mdSidenav('left').open();

        activeChapterName = Object.keys(TwitterService.getFlyToDict())[0];
        $scope.map.flyTo(TwitterService.getFlyToDict()[activeChapterName]);

        $scope.showSimpleToast();
    });

    $scope.toggleTimeline = function (){
        //$scope.timeLine = !$scope.timeLine;
    };

    $scope.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
                .textContent('New Tweet!')
                .position('bottom right')
                .hideDelay(1000)
        );
    };

    $scope.flyToTweet =  function (id){
        var tweet = _.find(TwitterService.allTweets.features, function(v){ return v.properties.id == id; });

        $scope.map.flyTo({center:tweet.geometry.coordinates});
        $scope.selectedTweet = tweet.properties.id;

    };

    // On every scroll event, check which element is on screen
    //window.onscroll = function() {
    //    var obj = Object.keys(TwitterService.getFlyToDict($scope.tweets));
    //    for (var i = 0; i < obj.length; i++) {
    //        var id = obj[i];
    //        if (isElementOnScreen(id)) {
    //            setActiveChapter(id);
    //            break;
    //        }
    //    }
    //};
    //
    //function setActiveChapter(id) {
    //    if (id === activeChapterName) return;
    //
    //    $scope.map.flyTo(TwitterService.getFlyToDict($scope.tweets)[id]);
    //
    //    document.getElementById(id).setAttribute('class', 'tweet active');
    //    document.getElementById(activeChapterName).setAttribute('class', 'tweet');
    //
    //    activeChapterName = id;
    //}
    //
    //function isElementOnScreen(id) {
    //    var element = document.getElementById(id);
    //    var bounds = element.getBoundingClientRect();
    //    return bounds.top < window.innerHeight && bounds.bottom > 0;
    //}

});
