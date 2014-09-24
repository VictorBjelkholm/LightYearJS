var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var insert = require('gulp-insert');

gulp.task('default', function() {
  throw new Error("There is no default task. Run ```make build``` to build latest")
});

gulp.task('scripts', function() {
  return gulp.src('src/*.js')
    .pipe(concat('LightYear.js'))
    .pipe(insert.append('module.exports = root'))
    .pipe(gulp.dest('build/'));
});


gulp.task('scripts-min', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(concat('LightYear.min.js'))
    .pipe(insert.append('module.exports = root'))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['scripts', 'scripts-min']);
