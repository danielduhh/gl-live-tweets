var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var tweets = require('../controllers/tweets');


/**
 * Post endpoint for getting tweets per location
 */
router.post('/tweets', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    // twitter search api
    //tweets.emitTweetsByPoint(req.body.location);

    // twitter steam api
    tweets.emitTweetsByBbox(req.body.properties.bounds);

});

module.exports = router;
