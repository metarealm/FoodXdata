
var youtube = require('./src/youtube-api');
var parser = require('./src/dataparser.js');
var logger = require('./src/logger.js');




logger.info('get data starts starts');
options = '&channelId=UC_R8qIXaTKpkAJuuiZhHTmA';
youtube.getYoutubeSearchResult(options)
.then( result=> {
    videos = parser.getVideoIDs(result);
    return youtube.getYoutubeVideoResult(videos.join())
})
.then(result=>{
    videoDetails = parser.getVideoDetails(result);
    console.log(videoDetails);
});
logger.info('getdata  ends');

