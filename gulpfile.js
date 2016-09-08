var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename');

gulp.task('default', ['dev']);
gulp.task('dev', ['watch', 'module']);
gulp.task('server', ['webserver']);

gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 9001,
      fallback: 'index.html'
    }));
});

gulp.task('module', function () {
  gulp.src('./module/index.js')
    .pipe(browserify({
      transform: ['reactify'],
      extensions: ['.js'],
    }))
    .on('error', console.log)
    .pipe(rename('module.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
  gulp.watch('./module/**/*.js', ['module']);
});
