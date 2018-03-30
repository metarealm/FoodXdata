
var youtube = require('./src/youtube-api');
var parser = require('./src/dataparser.js');
var logger = require('./src/logger.js');
var solr = require('./src/Solr-api');
var constants = require('./src/constants');
const fs = require('fs');
const channels = require('./data/channels.json');

logger.info('get data starts starts');
var channelIDs = channels.process;
var options, channelDir;

exports.getYoutubeData = function (options) {
    let arg;
    let currentToken = options.pageToken;
    let channelDir = options.channelDir;
    let channelID = options.channelId;
    if (options.pageToken === undefined || options.pageToken == '1stPage') {
        arg = '&channelId=' + channelID;
    } else {
        arg = '&channelId=' + channelID + '&pageToken=' + currentToken;
    }
    console.log('arg are ' + arg);
    youtube.getYoutubeSearchResult(arg)
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
};

// check if the channel data already present otherwise create the channel data directory
for (let i = 0; i < channelIDs.length; i++) {
    options = { 'channelId': channelIDs[i] };
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
            let currentToken = lines.slice(-1)[0];
            options.channelDir = channelDir;
            options.channelId = channelIDs[i];
            options.pageToken = currentToken;
            exports.getYoutubeData(options);
        }
    } else {
        fs.appendFileSync(channelDir + '/pageToken.json', '1stPage' + '\n', 'utf8');
        options.currentToken = '1stPage';
        options.channelId = channelIDs[i];
        options.channelDir = channelDir;
        exports.getYoutubeData(options);
    }
};
