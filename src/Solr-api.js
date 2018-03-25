const http = require('http');
const request = require('request');
const constants = require('./constants');

exports.rebuildSuggest = function () {
    return new Promise((resolve, reject) => {
        let options = {
            url: 'http://' + constants.SOLR_HOST + ':8983/solr/foodx/suggest?suggest.build=true'
        };
        console.log(options);
        request(options, function (error, response, body) {
            if (error) {
                reject(new Error('Failed to load page, status code: ' + error.statusCode));
            } else if (response && body) {
                console.log(body);
                resolve(body);
            }
        });
    });
};

exports.postDataToLocationSolr = function (postData) {
    console.info('inside post solr data rest call ');
    return new Promise((resolve, reject) => {
        const options = {
            host: constants.SOLR_HOST,
            port: 8983,
            path: '/solr/location/update?commit=true',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const request = http.request(options, (response) => {
            console.log(`STATUS: ${response.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
            response.setEncoding('utf8');
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            var searchResult = '';
            response.on('data', (chunk) => console.log(chunk));
            response.on('end', () => resolve(searchResult));
        });
        request.on('error', (err) => reject(err));
        request.write(postData);
        request.end();
    });
};

exports.postDataToSolr = function (postData) {
    console.info('inside post solr data rest call ');
    return new Promise((resolve, reject) => {
        const options = {
            host: constants.SOLR_HOST,
            port: 8983,
            path: '/solr/foodx/update?commit=true',
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const request = http.request(options, (response) => {
            console.log(`STATUS: ${response.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
            response.setEncoding('utf8');
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            var searchResult = '';
            response.on('data', (chunk) => console.log(chunk));
            response.on('end', () => resolve(searchResult));
        });
        request.on('error', (err) => reject(err));
        request.write(postData);
        request.end();
    });
};

exports.querySolr = function (query, loc) {
    return new Promise((resolve, reject) => {
        let url = 'http://' + constants.SOLR_HOST + ':8983/solr/foodx/select?' + query;
        // console.log(url);
        http.get(url, (response) => {
            response.setEncoding('utf8');
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            var searchResult = '';
            response.on('data', (chunk) => {
                searchResult = searchResult + chunk;
            });
            response.on('end', () => resolve(JSON.parse(searchResult).response.docs));
        });
    });
};

exports.deleteSolrData = function () {
    return new Promise((resolve, reject) => {
        var postData = '<delete><query>*:*</query></delete>';
        const options = {
            host: constants.SOLR_HOST,
            port: 8983,
            path: '/solr/foodX/update?commit=true',
            method: 'POST',
            headers: {
                'Content-type': 'text/xml',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        const request = http.request(options, (response) => {
            console.log(`STATUS: ${response.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
            response.setEncoding('utf8');
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            var searchResult = '';
            response.on('data', (chunk) => console.log(chunk));
            response.on('end', () => resolve(searchResult));
        });
        request.on('error', (err) => reject(err));
        request.write(postData);
        request.end();
    });
};
