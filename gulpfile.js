var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    streamqueue = require('streamqueue'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    handlebars = require('gulp-ember-handlebars'),
    sass = require('gulp-sass');
    
var ReactDependencies = [
    'react',
    'react-dom',
    'react-router',
    'jquery'
];

gulp.task('react', function() {
    bundleReact(false);
});

gulp.task('ember', function() {
    bundleEmber(false);
});

gulp.task('backbone', function() {
    bundleBackbone(false);
});

gulp.task('styles', function() {
   gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/'));
});

gulp.task('deploy', function() {
    bundleReact(true);
    bundleEmber(true);
    bundleBackbone(true);
});

gulp.task('watch', function() {
    gulp.watch(
        ['./react/*.js', './ember/*.js', './backbone/*.js', './sass/*.scss'], 
        ['react', 'ember', 'backbone', 'styles']);
});

gulp.task('default', ['react', 'ember', 'backbone', 'watch']);

var scriptsCount = 0;
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
            require: ReactDependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest('./public/react/'));
    }
    
    if (!isProduction) {
        ReactDependencies.forEach(function(dep) {
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


function bundleEmber(isProduction) {
    var stream = streamqueue({ objectMode: true });
    
    stream.queue(
        gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/handlebars/handlebars.min.js',
            'bower_components/ember/ember.min.js',
            'bower_components/ember-data/ember-data.min.js',
        ])
    );
    
    stream.queue(
        gulp.src([
            'bower_components/ember/ember-template-compiler.js',
            'ember/app.js'
        ])
        .pipe(uglify())
    );
    
    return stream.done()
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/ember/'));
}

function bundleBackbone(isProduction) {
    var stream = streamqueue({ objectMode: true });
    
    stream.queue(
        gulp.src([
            'bower_components/jquery/dist/jquery.min.js'
        ])
    );
    
    stream.queue(
        gulp.src([
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js',
            'backbone/app.js'
        ])
        .pipe(uglify())
    );
    
    return stream.done()
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/backbone/'));
}