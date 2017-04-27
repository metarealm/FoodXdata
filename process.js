
var youtube = require('./src/youtube-api');
var parser = require('./src/dataparser.js');
var logger = require('./src/logger.js');
var solr = require('./src/Solr-api');
var constants = require('./src/constants');
const fs = require('fs');

logger.info('get data starts starts');
var channel_ID = 'UC_R8qIXaTKpkAJuuiZhHTmA';
var options = '&channelId=' + channel_ID;;
var currentToken = '1stPage';

//check if the channel data already present otherwise create the channel data directory
channel_Dir = constants.WORKING_DIR + '/' + channel_ID;
if (!fs.existsSync(channel_Dir)) {
    fs.mkdirSync(channel_Dir);
}
//get the last page token for the channel , if 1st request for the channel create the pageToken file
if (fs.existsSync(channel_Dir + '/pageToken.json')) {
    var tokens = ''+fs.readFileSync(channel_Dir + '/pageToken.json', '', 'utf8');
    console.log(tokens);
    if (tokens !== undefined) {
        var lines = tokens.trim().split('\n');
        currentToken = lines.slice(-1)[0];
        options = options + '&pageToken=' + currentToken;
    }
}

console.log('options are ' + options);
youtube.getYoutubeSearchResult(options)
    .then(result => {
        fs.appendFileSync(channel_Dir + '/pageToken.json', result.nextPageToken+'\n', 'utf8');
        var videos = parser.getVideoIDs(result);
        return youtube.getYoutubeVideoResult(videos.join());
    })
    .then(videoDetails => {
        fs.writeFileSync(channel_Dir + '/' + currentToken + '.json', JSON.stringify(videoDetails), 'utf8');
        return videoDetails;
    })
    .then(result => {
        videoDetails = parser.getVideoDetails(result);
        var json = JSON.stringify(videoDetails);
        return solr.postDataToSolr(json);
    })
    .then(result => logger.info('complete'))
    .catch(error => logger.error(' error cought ' + error));


