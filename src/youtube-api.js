var https = require('https');
var constants = require('./constants');


exports.getYoutubeSearchResult = function () {
    return new Promise((resolve, reject) => {
        var searchURL = constants.YOUTUBE_SEARCH_URL + '&part=id&type=video' + '&q=' + 'chicken' + '&maxResults=10';
        // console.info('inside the getYoutubeSearchResult rest call = ' + searchURL);
        const lib = searchURL.startsWith('https') ? require('https') : require('http');
        const request = https.get(searchURL, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            var searchResult = '';
            response.on('data', (chunk) => searchResult += chunk);
            response.on('end', () => resolve(JSON.parse(searchResult)));
        });
        request.on('error', (err) => reject(err));
        request.end();
    })
}

exports.getYoutubeVideoResult = function (id) {
    return new Promise((resolve, reject) => {
        console.info('inside the getYoutubeVideohResult rest call for ids ' + id);
        var videohURL = constants.YOUTUBE_VIDEO_URL + '&part=id,snippet,statistics,localizations,topicDetails,contentDetails&id=' + id;
        const request = https.get(videohURL, function (response) {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            var videoResult = '';
            response.on('data', (chunk) => videoResult += chunk);
            response.on('end', () => {
                // console.log(videoResult);
                resolve(JSON.parse(videoResult));
            });
        });
        request.on('error', (err) => reject(err));
        request.end();
    })
}
