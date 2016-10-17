const gulp = require('gulp');

// plugins
const 
		connect = require('gulp-connect')
	,	less = require('gulp-less')
	, path = require('path');

gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 3000,
    fallback: 'app/index.html',
    https: true
  });
});

 
gulp.task('less', function () {
  return gulp.src('./app/assets/styles/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./app/assets/styles'));
});

gulp.task('less:watch', function() {
	gulp.watch('./app/assets/styles/less/*.less', ['less']);
});