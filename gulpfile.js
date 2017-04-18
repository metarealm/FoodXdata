var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task( 'default',['solrLoad'],function(){
    gutil.log('gulp default task');
});

gulp.task('solrLoad',['getData'], function(){
    gutil.log('in the solrLoad task');
})

gulp.task('getData', function(){
    gutil.log('in the get Data from the youtube task');
})