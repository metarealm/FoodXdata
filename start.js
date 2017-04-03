var winston = require('winston');
var YoutubeService = require('./YoutubeAPIUrl');


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ 'timestamp': true })
    ]
});


logger.level = 'debug';
logger.info('winston logging start');

var ytSvr = new YoutubeService();

callbackfunction = function (videoID) {
    console.log('this log is from the callback function passed');
    ytSvr = new YoutubeService();
    ytSvr.getYoutubeVideoResult(videoID,function(){});
}

// callbackfunction= ytSvr.getYoutubeVideoResult ;
ytSvr.getYoutubeSearchResult(callbackfunction);






