
var youtube = require('./src/youtube-api');
var parser = require('./src/dataparser.js');
var logger = require('./src/logger.js');
var solr = require('./src/Solr-api');
var constants = require('./src/constants');
const fs = require('fs');
const channels = require('./data/channels.json');

logger.info('get data starts starts');
var channelIDs = channels;
var options, channelDir;
var currentToken = '1stPage';

// check if the channel data already present otherwise create the channel data directory
for (let i = 0; i < channelIDs.length; i++) {
    options = '&channelId=' + channelIDs[i];
    channelDir = constants.WORKING_DIR + '/' + channelIDs[i];
    if (!fs.existsSync(channelDir)) {
        fs.mkdirSync(channelDir);
    }
    // get the last page token for the channel , if 1st request for the channel create the pageToken file
    if (fs.existsSync(channelDir + '/pageToken.json')) {
        var tokens = '' + fs.readFileSync(channelDir + '/pageToken.json', '', 'utf8');
        console.log(tokens);
        if (tokens !== undefined) {
            var lines = tokens.trim().split('\n');
            currentToken = lines.slice(-1)[0];
            options = options + '&pageToken=' + currentToken;
        }
    }
}

console.log('options are ' + options);
youtube.getYoutubeSearchResult(options)
    .then(result => {
        fs.appendFileSync(channelDir + '/pageToken.json', result.nextPageToken + '\n', 'utf8');
        var videos = parser.getVideoIDs(result);
        return youtube.getYoutubeVideoResult(videos.join());
    })
    .then(videoDetails => {
        fs.writeFileSync(channelDir + '/' + currentToken + '.json', JSON.stringify(videoDetails), 'utf8');
        return videoDetails;
    })
    .then(result => {
        let videoDetails = parser.getVideoDetails(result);
        var json = JSON.stringify(videoDetails);
        return solr.postDataToSolr(json);
    })
    .then(result => logger.info('complete'))
    .catch(error => logger.error(' error cought ' + error));
