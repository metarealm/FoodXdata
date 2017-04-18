

exports.getSearchDetails = function(result) {

    searchDetails = {};
    searchDetails.etap = result.etag;
    searchDetails.nextPageToken = result.nextPageToken;

    return searchDetails;
}

exports.getVideoIDs = function(result){

    videos = [];
    result.items.forEach(item =>{
        videos.push(item.id.videoId);
    })
    return videos;
}
