var chai = require('chai');
var expect = chai.expect;
var youtube = require('./../src/youtube-api');

describe('youtube-api', function () {


    it('search return values', ()=>{
        return youtube.getYoutubeSearchResult()
        .then((result)=> {
            // console.log(result);
            expect(result).to.have.property('pageInfo');
        });

        
    });
});