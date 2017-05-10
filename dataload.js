
var youtube = require('./src/youtube-api');
var parser = require('./src/dataparser.js');
var logger = require('./src/logger.js');
var solr = require('./src/Solr-api');
var constants = require('./src/constants');
const fs = require('fs');

logger.info('data load starts');
var channel_ID = 'UC_R8qIXaTKpkAJuuiZhHTmA';
var options = '&channelId=' + channel_ID;;
var currentToken = '1stPage';
channel_Dir = constants.WORKING_DIR + '/' + channel_ID;

loadFileDataToSolr = function (dir, file) {
    if (!fs.lstatSync(dir + '/' + file).isDirectory() && file != 'pageToken.json') {
        console.log('going to post data from file ' + file);
        let filecontent = fs.readFileSync(dir + '/' + file);
        videoDetails = parser.getVideoDetails(JSON.parse(filecontent));
        solr.postDataToSolr(JSON.stringify(videoDetails));
    }
}

//check if the channel data already present otherwise create the channel data directory
loadFolderDataToSolr = function (channel_Dir) {
    if (fs.existsSync(channel_Dir)) {
        fs.readdir(channel_Dir, (err, files) => {
            files.forEach(file => loadFileDataToSolr(channel_Dir, file));
        })
    }
}


loadFolderDataToSolr(channel_Dir);

