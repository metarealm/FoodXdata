const SolrObject = require('./SolrObject');
const LocObject = require('./LocationObject');

exports.getSearchDetails = function (result) {
    var searchDetails = {};
    searchDetails.etap = result.etag;
    searchDetails.nextPageToken = result.nextPageToken;
    return searchDetails;
};

exports.getVideoIDs = function (result) {
    var videos = [];
    result.items.forEach(item => {
        videos.push(item.id.videoId);
    });
    return videos;
};

exports.getVideoDetails = function (data) {
    var videoDetails = [];
    data.items.forEach(item => {
        let tag = (item.snippet.tags === undefined) ? 'india' : item.snippet.tags.join();
        let detail = new SolrObject(item.etag, 'yt' + item.id, item.snippet.channelId,
            item.snippet.channelTitle,
            item.snippet.description, item.statistics.likeCount, item.snippet.title,
            tag, item.statistics.viewCount, item.id);
        videoDetails.push(detail);
    });
    return videoDetails;
};

exports.getLocationDetails = function (data) {
    var locDetails = [];
    data.forEach(item => {
        let detail = new LocObject(item.name, item.lat, item.lon, item.videos, item.stateName);
        // console.log(detail);
        locDetails.push(detail);
    });
    return locDetails;
};
