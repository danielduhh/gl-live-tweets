var Twitter = require('twitter');
//var settings = require('../settings');

// pass in twitter api tokens
var twitterAPI = new Twitter({
    consumer_key: process.env.twitter_consumer_key,
    consumer_secret: process.env.twitter_consumer_secret,
    access_token_key: process.env.twitter_access_token_key,
    access_token_secret: process.env.twitter_access_token_secret
});

//var twitterAPI = new Twitter(settings.twitter);

var tweets = {};
var io;

/**
 * initialize socket io
 * @param socket
 */
tweets.init = function(socket){
    io = socket;
    //tweets.emitTweetsByBbox();
};

/**
 * get tweets by geom point
 * @param geo
 */
tweets.emitTweetsByPoint = function (geo) {
    /**
     * Get all tweets within 100km of seattle
     */
    setInterval(function () {

        var options = {
            q: '-filter:retweets',
            geocode: [geo.lat, geo.lng, '5mi'].join(","),
            count: 100
        };

        twitterAPI.get('search/tweets', options, function (err, data, response) {
            if (err) {
                console.log(err);
                // something went wrong
            } else {
                console.log('new search tweet');
                //res.send(data)
                io.emit('tweet', data);

            }
        });
    // rate for user_timeline is 180 per 15 minutes
    }, 10000);

};

/**
 * get streaming tweets by bounding box
 * @param geo
 */
tweets.emitTweetsByBbox = function (geo){
    /**
     * Stream statuses filtered by keyword
     * number of tweets per second depends on topic popularity
     **/

    var streamOptions = {
        locations: [geo.southwest.lng, geo.southwest.lat, geo.northeast.lng, geo.northeast.lat].join(",")
    };

    var tweetObj = {
        statuses:[]
    };

    twitterAPI.stream('statuses/filter', streamOptions,  function(stream){
        stream.on('data', function(tweet) {
            if(tweet.coordinates){
                console.log(tweet.coordinates);
                tweetObj.statuses.push(tweet);
                io.emit('tweet', tweetObj);
            }
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
};

module.exports = tweets;