const parser = require('./src/dataparser.js');
const logger = require('./src/logger.js');
const solr = require('./src/Solr-api');
const constants = require('./src/constants');
const fs = require('fs');
const cities = require('./data/indiancities.json');
const MongoClient = require('mongodb').MongoClient;

exports.loadFileDataToSolr = function (dir, file) {
    if (!fs.lstatSync(dir + '/' + file).isDirectory() && file !== 'pageToken.json') {
        console.log('going to post data from file ' + file);
        let filecontent = fs.readFileSync(dir + '/' + file);
        let videoDetails = parser.getVideoDetails(JSON.parse(filecontent));
        solr.postDataToSolr(JSON.stringify(videoDetails));
    }
};

// check if the channel data already present otherwise create the channel data directory
exports.loadFolderDataToSolr = function (channelDir) {
    if (fs.existsSync(channelDir)) {
        fs.readdir(channelDir, (err, files) => {
            if (err) {
                console.log(err.stack);
            }
            files.forEach(file => exports.loadFileDataToSolr(channelDir, file));
        });
    }
};

exports.loadAllDataToSolr = function () {
    if (fs.existsSync(constants.WORKING_DIR)) {
        fs.readdir(constants.WORKING_DIR, (err, files) => {
            if (err) {
                console.log(err.stack);
            }

            files.forEach(file => {
                if (fs.lstatSync(constants.WORKING_DIR + '/' + file).isDirectory()) {
                    console.log('going to process dir ' + file);
                    exports.loadFolderDataToSolr(constants.WORKING_DIR + '/' + file);
                }
            });
        });
    }
};

exports.postLocDatatoSolr = function () {
    let url = 'mongodb://10.0.0.106:27017';
    return MongoClient.connect(url)
        .then((client) => client.db('peeknmake'))
        .then((db) => db.collection('indianCities'))
        .then((cities) => {
            return cities.find().toArray();
        })
        .then(result => {
            return exports.getSolrlocVideos(result);
        })
        .then((result) => {
            let locationDetails = parser.getLocationDetails(result);
            return solr.postDataToLocationSolr(JSON.stringify(locationDetails));
        })
        .then(result => {
            console.log(result);
            return 'succes';
        })
        .catch(exp => console.log(exp));
};

exports.postLocDatatoSolrfromJson = function () {
    return exports.getSolrlocVideos(cities)
        .then((result) => {
            let locationDetails = parser.getLocationDetails(result);
            return solr.postDataToLocationSolr(JSON.stringify(locationDetails));
        })
        .then(result => {
            console.log(result);
            return 'succes';
        })
        .catch(exp => console.log(exp));
};

exports.getSolrlocVideos = function (locData) {
    let promises = [];
    locData.map((loc, i, a) => {
        let query = 'fl=youtubevideoID&q=' + loc.name + '&rows=200&wt=json';
        promises.push(solr.querySolr(query, loc.name).then(result => {
            result.forEach((num, index) => result[index] = result[index].youtubevideoID);
            // console.log(result);
            return { 'name': loc.name, 'lat': loc.lat, 'lon': loc.lon, 'videos': result, 'stateName': loc.state };
        }));
    });

    return Promise.all(promises).then(function (values) {
        return values;
    });
};

exports.loadFileDataToMongo = function (dir, file) {
    if (!fs.lstatSync(dir + '/' + file).isDirectory() && file !== 'pageToken.json') {
        console.log('going to post data from file ' + file);
        let filecontent = fs.readFileSync(dir + '/' + file);
        let videoDetails = parser.getVideoDetails(JSON.parse(filecontent));
        solr.postDataToSolr(JSON.stringify(videoDetails));
    }
};

// check if the channel data already present otherwise create the channel data directory
exports.loadFolderDataToMongo = function (channelDir) {
    if (fs.existsSync(channelDir)) {
        fs.readdir(channelDir, (err, files) => {
            if (err) {
                console.log(err.stack);
            }
            files.forEach(file => exports.loadFileDataToMongo(channelDir, file));
        });
    }
};

exports.buildSuggest = function () {
    solr.rebuildSuggest();
};

// exports.postLocDatatoSolrfromJson();
// exports.postLocDatatoSolr();
// exports.loadAllDataToSolr();
