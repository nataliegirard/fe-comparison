var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    babelify = require('babelify');
    
var dependencies = [
    'react',
    'react-dom',
    'react-router',
    'jquery'
];

var scriptsCount = 0;

gulp.task('scripts', function() {
    bundleApp(false);
});

gulp.task('deploy', function() {
    bundleApp(true);
});

gulp.task('watch', function() {
    gulp.watch(['./app/*.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);

function bundleApp(isProduction) {
    scriptsCount++;
    var appBundler = browserify({
        entries: './app/app.js',
        debug: true
    });
    
    // If not production, separate dependencies so as to not bundle them
    // each time a file changes
    if (!isProduction && scriptsCount === 1) {
        // create vendor.js for dev environment
        browserify({
            require: dependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest('./public/'));
    }
    
    if (!isProduction) {
        dependencies.forEach(function(dep) {
            appBundler.external(dep);
        });
    }
    
    appBundler 
        .transform('babelify', {presets: ["es2015", "react"]})
        .bundle()
        .on('error', gutil.log)
        .pipe(source('app.js'))
        .pipe(gulp.dest('./public/'));
}