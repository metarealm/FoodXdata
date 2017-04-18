

exports.getSearchDetails = function (result) {

    searchDetails = {};
    searchDetails.etap = result.etag;
    searchDetails.nextPageToken = result.nextPageToken;

    return searchDetails;
}

exports.getVideoIDs = function (result) {

    var videos = [];
    result.items.forEach(item => {
        videos.push(item.id.videoId);
    })
    return videos;
}

exports.getVideoDetails = function (data) {
    var videoDetails = [];
    data.items.forEach(item => {
        detail = {};
        detail.etag = item.etag;
        detail.id = 'yt' + item.id;

        detail.Food_Type_Speciality = 'regular';
        detail.Recipe_title = item.snippet.title;
        detail.channelID = item.snippet.channelId;
        // detail.channelRecipe_title =;
        // detail.channellocation =;
        // detail.channeltag' : ', ',
        detail.channeltitle = item.snippet.channelTitle;
        detail.description = item.snippet.description;
        // detail.ingredients =;
        detail.likes = item.statistics.likeCount;
        detail.recipe_title = item.snippet.title;
        detail.vedioTag = item.snippet.tags.join();
        // detail.video_Location =;
        detail.views = item.statistics.viewCount;
        detail.youtubevideoID = item.id;

        // console.log(item.contentDetails);
        videoDetails.push(detail);
    });
    return videoDetails;
}
