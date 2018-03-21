
module.exports = Object.freeze({
    YOUTUBE_SEARCH_URL: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc&videoEmbeddable=true',
    YOUTUBE_VIDEO_URL: 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc&videoEmbeddable=true',
    SOLR_HOST: (process.env.NODE_ENV === 'PROD') ? 'ec2-34-209-114-162.us-west-2.compute.amazonaws.com' : '10.0.0.106',
    MAX_COUNT: 50,
    LOGLVEL: 'info',
    WORKING_DIR: '/Users/bhabanidas/Work/DATA/foodxdata'
});
