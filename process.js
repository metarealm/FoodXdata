
var youtube = require('./src/youtube-api');
var parser = require('./src/dataparser.js');
var logger = require('./src/logger.js');
var solr = require('./src/Solr-api');
var constants = require('./src/constants');
const fs = require('fs');





logger.info('get data starts starts');
options = '&channelId=UC_R8qIXaTKpkAJuuiZhHTmA';
youtube.getYoutubeSearchResult(options)
    .then(result => {
        videos = parser.getVideoIDs(result);
        return youtube.getYoutubeVideoResult(videos.join())
    })
    .then(result => {
        videoDetails = parser.getVideoDetails(result);
        var json = JSON.stringify(videoDetails);
        return solr.postDataToSolr(json);
    })
    .then(result => {
        fs.writeFile(constants.WORKING_DIR + 'tobprocessed/myjsonfile.json', result, 'utf8', function () {
            logger.info('getdata  ends');
        });
    })
    .catch(error => logger.error(' error cought ' + error));


