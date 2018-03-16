var gulp = require('gulp');
var gutil = require('gulp-util');
var solr = require('./src/Solr-api.js');
var constants = require('./src/constants');
var clean = require('gulp-clean');

gulp.task('default', ['solrLoad'], function () {
    gutil.log('gulp default task');
});

gulp.task('solrLoad', ['getData'], function () {
    gutil.log('in the solrLoad task');
});

gulp.task('mongoLoad', ['getData'], function () {
    gutil.log('in the mongoLoad task');
});

gulp.task('getData', function () {
    gutil.log('in the get Data from the youtube task');
});

gulp.task('clearSolrData', function (cb) {
    gutil.log('in the delete Data from the youtube task');
    return solr.deleteSolrData()
        .then()
        .catch();
});
gulp.task('clearOldData', ['clearSolrData'], function () {
    return gulp.src(constants.WORKING_DIR + '/*', { read: false })
        .pipe(clean({ force: true }));
});
gulp.task('postDataToSolr', function () {
    gutil.log('going to post data to solr');
});
