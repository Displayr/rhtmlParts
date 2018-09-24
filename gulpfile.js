const path = require('path')
const browserify = require('browserify')
const babelify = require('babelify')
const gulp = require('gulp')
const gutil = require('gulp-util')
const tap = require('gulp-tap')
const buffer = require('gulp-buffer')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

gulp.task('default', function () {
  gulp.start('dist')
})

gulp.task('dist', function () {
  const entryPoint = path.join(__dirname, './src/index.js')
  const dest = path.join(__dirname, 'dist/')

  return gulp.src(entryPoint, {read: false})
    .pipe(tap(function (file) {
      gutil.log(`bundling ${file.path}`)

      file.contents = browserify(file.path, {debug: true, standalone: 'rhtmlParts'})
        .transform(babelify, {
          presets: [require('babel-preset-es2015-ie')],
          plugins: [
            require('babel-plugin-transform-object-assign'),
            require('babel-plugin-transform-exponentiation-operator'),
            require('babel-plugin-array-includes').default
          ]
        })
        .bundle()
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()) })
})
