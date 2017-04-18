
var winston = require('winston');
var YoutubeService = require('./YoutubeAPIUrl');



var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ 'timestamp': true })
    ]
});
logger.level = 'debug';
logger.info('winston logging start');


callbackFunction = function(text , callback){
    callback(text);
}

callbackFunction1 = function(text , callback){
    setTimeout(callback,0,text);
}

callbackFunction2 = function(text , callback){
    process.nextTick(callback,text);
}

testPromise = function () {
    return new Promise(function (resolve, reject) {
        resolve("Promise retruned data");
    });
}

testPromise2 = function(data){
    return new Promise((resolve,reject)=> {resolve(data + " got reprocessed")});
}

logger.info('------callback  testing  start------');

callbackFunction2('call back without promise in asnchronous manner with process.nexttick', function(data){
    console.log(data);
});
callbackFunction1('call back without promise in asnchronous manner with set setTimeout', function(data){
    console.log(data);
});
callbackFunction('call back without promise in snchronous manner ', function(data){
    console.log(data);
});

testPromise()
.then(data=>testPromise2(data))
.then(function(data){
  console.log(data);
}).catch( function(error){
    console.log("error caught -"+error);
});

logger.info('------callback  testing  ends------');