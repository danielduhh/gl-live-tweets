# MapboxGL Live Tweets
Use the place finder and fly to a location to view real time tweets in that area!

### Dependencies
[Express](http://expressjs.com/) - web development framework for nodejs
    
[Angular](https://angularjs.org/) - javacsript mvc framework
    
[Socket.io](http://socket.io/) - real-time event based communication

[Twitter](https://dev.twitter.com/streaming/overview) - search and steam API

[OpenCage Geocode API](http://geocoder.opencagedata.com/api.html)

#### Installation
Create a settings.js file with Twitter API creds in this directory, use the [settings-example.js](settings-example.js) as an example

Install app dependencies 
    
    npm install
    bower install

Build app .min files & watch for changes
        
    grunt build
    
Start app
    
    npm start
        
View application at: http://localhost:4000