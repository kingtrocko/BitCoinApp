var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var less = require('gulp-less');
var autoprefixer = require('autoprefixer');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var port = process.env.PORT || 8000; 

var path = {
	MINIFIED_OUT: 'build.min.js',
	DEST_BUILD: 'public/js',
	ENTRY_POINT: './App/browser.js'
};

gulp.task('build', function() {
	console.log('********** This operation is not supported anymore');
	console.log('********** Try runnig - gulp watch - to compile the files under the public directory to the dist directory and watch for changes');
	console.log('********** Then in a second terminal tab run - gulp serve-dev - to launch the server and watch for changes on server files');
	console.log('********** For more information refer to the README.md file');
});

gulp.task('reactify', function() {
	console.log('********** Converting React to JS');

	browserify({
		entries: ['./App/browser.js'],
		transform: [reactify],
	})
	.bundle()
	.pipe(source('build.min.js'))
	.pipe(streamify(uglify('build.min.js')))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
	console.log('********** Compiling LESS --> CSS');

	return gulp
		.src('./public/css/styles.less')
		.pipe(plumber())
		.pipe(less())
		//.pipe(minifyCSS())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('fonts', function() {
	console.log('********** Copying Fonts');

	return gulp
		.src('./public/fonts/**/*.*')
		.pipe(gulp.dest('./dist/' + 'fonts'))
});

gulp.task('css-plugins', function() {
	console.log('********** Copying CSS Plugins');

	return gulp
		.src('./public/css/plugins/**/*.*')
		.pipe(gulp.dest('./dist/css/' + 'plugins'))
});

gulp.task('bootstrap-css', function() {
	console.log('********** Copying Bootstrap CSS File');

	return gulp
		.src('./public/css/bootstrap.min.css')
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('js', function() {
	console.log('********** Copying JS');

	return gulp
		.src('./public/js/**/*.*')
		.pipe(gulp.dest('./dist/' + 'js'))
});

gulp.task('ejs', function() {
	console.log('********** Copying EJS Templates');

	return gulp
		.src('./public/*.ejs')
		.pipe(gulp.dest('./dist'))
});


gulp.task('images', function() {
	console.log('********** Copying Images');

	return gulp
		.src('./public/images/**/*.*')
		//.pipe(imagemin([{optimizationLevel: 4}))
		.pipe(gulp.dest('./dist/' + 'images'))
});

gulp.task('watch', ['ejs', 'js', 'styles', 'bootstrap-css', 'fonts', 'css-plugins', 'images', 'reactify'], function() {
	console.log('********** Watching jp, jsx, html, less, and font  files');

	gulp.watch('./app/**/*.*', ['reactify']);
	gulp.watch('./public/css/**/*.*', ['styles', 'fonts', 'css-plugins']);
	gulp.watch('./public/images/**/*.*', ['images']);
	gulp.watch('./public/js/**/*.*', ['js']);
	gulp.watch('./public/*.ejs', ['ejs']);
});

gulp.task('serve-dev', function() {
	var isDev = true;
	var nodeOptions = {
		script: './server.js',
		delayTime: 1,
		env: {
			'PORT': port,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		watch: ['./']
	};

	return nodemon(nodeOptions)
		.on('restart', function(ev) {
			console.log('********** nodemon restarted');
			console.log('********** files changed on restart:\n' + ev);
		})
		.on('start', function() {
			console.log('********** nodemon started');
		})
		.on('crash', function() {
			console.log('********** nodemon crashed: script crashed for some reason');
		})
		.on('exit', function() {
			console.log('********** nodemon exited cleanly');
		});
});