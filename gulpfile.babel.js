import gulp from 'gulp';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import runSequence from 'run-sequence';
import del from 'del';

// CSS
import prefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-minify-css';
import sass from 'gulp-sass';
import scsslint from 'gulp-scss-lint';
import uncss from 'gulp-uncss';

// JS
import babel from 'gulp-babel';
import browserify from 'browserify';

gulp.task('build-styles-sass', function() {
  return gulp.src('./dev/css/main.scss')
      .pipe(scsslint())
      .pipe(sass().on('error', sass.logError))
      .pipe(rename('compiled.css'))
      .pipe(gulp.dest('./dev/css/'));
});
gulp.task('build-styles-compile', function() {
  return gulp.src('./dev/css/compiled.css')
    .pipe(prefixer().on('error', gutil.log))
    .pipe(uncss({
      html: ['./prod/*.html'],
      ignore: [
        /\:hover/,
        /\:valid/,
        /\:active/,
        /\:invalid/
      ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./prod/css/'));
});
gulp.task('build-styles', function() {return runSequence('build-styles-sass', 'build-styles-compile');});

gulp.task('build-script-example', function() {
  return browserify('./dev/js/example.js').transform('babelify', {presets: ['es2015']})
  .bundle()
  .on('error', function (e) {
      gutil.log(e);
  })
  .pipe(source('stepper-example.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify({mangle: false}))
  .pipe(sourcemaps.write('./', {sourceRoot: './dev/js'}))
  .pipe(gulp.dest('./prod/js'));
});

gulp.task('build-script-library', function() {
  return gulp.src(['./dev/js/stepper.js'])
    .on('error', function (e) {
        gutil.log(e);
    })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('./', {sourceRoot: './dev/js'}))
    .pipe(gulp.dest('./prod/js'));
});

gulp.task('build-script-minified', function() {
  return gulp.src('./prod/js/stepper.js')
    .on('error', function (e) {
        gutil.log(e);
    })
    .pipe(uglify({mangle: false}))
    .pipe(rename('stepper.min.js'))
    .pipe(gulp.dest('./prod/js'));
});

gulp.task('build-scripts', function() {return runSequence(
    ['build-script-example', 'build-script-library'],
    'build-script-minified'
  );});
gulp.task('build-clean', function() {return del('./prod/js', './prod/css');});
gulp.task('build', function() {runSequence('build-clean', 'build-scripts', 'build-styles');});
gulp.task('default', function() {
  gulp.watch(['./dev/css/**', './!prod/**', '!./dev/css/compiled.css'], ['build-styles']);
  gulp.watch(['./dev/js/*.js', './!prod/**'], ['build-scripts']);
});