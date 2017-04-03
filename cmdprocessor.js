
var https = require('https');



let youtubeSearchURL = 'https://www.googleapis.com/youtube/v3/search?type=video&part=id&key=AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc&videoEmbeddable=true';
let youtubeVideoURL = 'https://www.googleapis.com/youtube/v3/videos?part=id&key=AIzaSyBgJ0KTiDr4VQKrAJ9-BmR7oMFMivAksEc&videoEmbeddable=true';
let conditions = 'indian%20recipe';
let maxcount = '1';

// '&pageToken=' + this.nextToken


getYouTubeSearchURL = function (conditions, maxcount) {
    let url = youtubeSearchURL + '&q=' + conditions + '&maxResults=' + maxcount;
    console.log(url);
    return url;
}
getYouTubeVideoURL = function (id) {
    let url = youtubeVideoURL + '&id=' +id;
    console.log(url);
    return url;
}
function SolrObj(id) {
    this.youtubeVideoID = id;
    https.get(getYouTubeVideoURL(id),requestFunction1);
}

parseResultFunction = function (str) {
    // console.log(str);
    jsonString = JSON.parse(str);
    if(jsonString['items'] != undefined ){
        solrobjID = new SolrObj(jsonString['items'][0]['id']['videoId']);
        console.log(jsonString.items);
    }
}

parseResultFunction1 = function (str) {
    // console.log(str);
    // jsonString = JSON.parse(str);

}

requestFunction = function (response) {
    var str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });
    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        parseResultFunction(str);
    });
}
requestFunction1 = function (response) {
    var str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });
    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        console.log(str);
        parseResultFunction1(str);
    });
}

console.log('command proccessed');
https.get(getYouTubeSearchURL(conditions, maxcount), requestFunction).end();
// https.get(options,callback);

