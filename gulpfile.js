var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    sass = require('gulp-sass');
    
var dependencies = [
    'react',
    'react-dom',
    'react-router',
    'jquery'
];

var scriptsCount = 0;

gulp.task('react', function() {
    bundleReact(false);
});

gulp.task('styles', function() {
   gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/'));
});

gulp.task('deploy', function() {
    bundleReact(true);
});

gulp.task('watch', function() {
    gulp.watch(['./react/*.js', './sass/*.scss'], ['react', 'styles']);
});

gulp.task('default', ['react', 'watch']);

function bundleReact(isProduction) {
    scriptsCount++;
    var appBundler = browserify({
        entries: './react/app.js',
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
            .pipe(gulp.dest('./public/react/'));
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
        .pipe(gulp.dest('./public/react/'));
}