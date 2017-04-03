var winston = require('winston');
var https = require('https');


var YoutubeService = function () {

    this.YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc&videoEmbeddable=true';
    this.YOUTUBE_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc&videoEmbeddable=true';
    this.MAX_COUNT = 1;
    this.CONDITION = 'Masala Chicken Recipe in Hindi';

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({ 'timestamp': true })
        ]
    });
    logger.level = 'debug';
    logger.info('winston logging in the youtube URL module');

    this.getYouTubeSearchURL = function (conditions, maxcount) {
        if (conditions == undefined)
            condition = this.CONDITION;
        if (maxcount == undefined)
            maxcount = this.MAX_COUNT;
        let url = this.YOUTUBE_URL + '&part=id&type=video' + '&q=' + this.CONDITION + '&maxResults=' + this.MAX_COUNT;
        console.log(url);
        return url;
    }

    this.getYouTubeVideoURL = function (id) {
        let url = this.YOUTUBE_VIDEO_URL + '&part=id,snippet,statistics,localizations,topicDetails,contentDetails&id='+ id;
        console.log(url);
        return url;
    }
    callbackSearch = function (response) {
        var searchResult = '';
        response.on('data', function (chunk) {
            searchResult += chunk;
        });
        response.on('end', function () {
            logger.info(' on end call back function called');
            parseSearchResult(searchResult);
            logger.info(' on end call back funcation ended');
        });
    }

    callbackVideo = function(response){
        var videoResult = '';
        response.on('data', function (chunk) {
            videoResult += chunk;
        });
        response.on('end', function () {
            logger.info(' on end call back function called');
            parsevideoResult(videoResult);
            logger.info(' on end call back funcation ended');
        });
    }
    parseSearchResult = function (searchResult) {
        jsonString = JSON.parse(searchResult);
        if (jsonString['items'] != undefined) {
            solrobjID = jsonString['items'][0]['id']['videoId'];
        }
        logger.info('id =' + solrobjID);
        if (typeof postSearchCallback == 'function') {
            postSearchCallback(solrobjID);
        }
    }
    parsevideoResult = function(videoResult){
        jsonString = JSON.parse(videoResult);
        console.info(jsonString['items'][0].statistics);
        console.info(jsonString['items'][0].topicDetails);
    }

    this.getYoutubeSearchResult = function (callback) {
        logger.info('inside the getYoutubeSearchResult rest call');
        postSearchCallback = callback;
        console.info(postSearchCallback);
        https.get(this.getYouTubeSearchURL(), callbackSearch).end();
        logger.info('get called posted');
    }

    this.getYoutubeVideoResult = function (id,callback) {
        logger.info('inside the getYoutubeVideohResult rest call');
        if(callback !== undefined ){
            postSearchCallback = callback;
        }
        https.get(this.getYouTubeVideoURL(id), callbackVideo).end();
        logger.info('get called posted');
    }


}

module.exports = YoutubeService;
