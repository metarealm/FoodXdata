var winston = require('winston');
// var YoutubeService = require('./YoutubeAPIUrl');
var youtube = require('./src/youtube-api');
var parser = require('./src/dataparser.js');




var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ 'timestamp': true })
    ]
});
logger.level = 'debug';
logger.info('winston logging start');

youtube.getYoutubeSearchResult()
.then( result=> {
    videos = parser.getVideoIDs(result);
    console.log(videos);
    return youtube.getYoutubeVideoResult(videos.join())
})
.then(result=>console.log(result));









