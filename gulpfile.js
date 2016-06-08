var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    streamqueue = require('streamqueue'),
    babelify = require('babelify'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    htmlbars = require('gulp-htmlbars-compiler'),
    sass = require('gulp-sass');

gulp.task('react', function() {
    bundleReact(false);
});

gulp.task('ember', function() {
    var compiler = require('./bower_components/ember/ember-template-compiler');
    bundleEmber(false);
    
    return gulp.src('./ember/templates/*.hbs')
		.pipe(htmlbars({
			compiler: compiler
		}))
		.pipe(uglify())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./public/ember/'));
});

gulp.task('backbone', function() {
    bundleBackbone(false);
});

gulp.task('angular', function() {
    bundleAngular(false);
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
    bundleAngular(true);
});

gulp.task('watch', function() {
    gulp.watch(
        ['./react/*.js', './ember/*.js', './backbone/*.js', './angular/*.js', './sass/*.scss'], 
        ['react', 'ember', 'backbone', 'angular', 'styles']);
});

gulp.task('default', ['react', 'ember', 'backbone', 'angular', 'watch']);


function bundleReact(isProduction) {
    var stream = streamqueue({ objectMode: true });
    
    stream.queue(
        gulp.src([  
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/react/react.min.js',
            'bower_components/react/react-dom.min.js',
        ])
    );
    
    stream.queue(
        browserify({
                require: 'react-router'
            })
            .transform('babelify', {presets: ["es2015", "react"]})
            .bundle()
            .pipe(source('vendors.js'))
            .pipe(buffer())
            .pipe(uglify())
            .on('error', gutil.log)
    );
    
    stream.queue(
        browserify('./react/app.js', { debug: true })
            .transform('babelify', {presets: ["es2015", "react"]})
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(uglify())
            .on('error', gutil.log)
    );
    
    return stream.done()
        .pipe(concat('app.js'))
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

function bundleAngular(isProduction) {
    var stream = streamqueue({ objectMode: true });
    
    stream.queue(
        gulp.src([
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'angular/app.js'
        ])
        .pipe(uglify())
    );
    
    return stream.done()
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/angular/'));
}