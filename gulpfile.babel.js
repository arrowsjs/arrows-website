import babel from 'gulp-babel'
import cleancss from 'gulp-clean-css'
import download from 'gulp-download'
import gulp from 'gulp'
import htmlmin from 'gulp-htmlmin'
import uglify from 'gulp-uglify'

const paths = {
  vendor: [
    'https://github.com/efritz/arrows/releases/download/0.5/arrows.js',
    'https://github.com/efritz/arrows/releases/download/0.5/arrows.es5.js',
    'https://github.com/efritz/arrows/releases/download/0.5/arrows.min.js'
  ]
};

gulp.task('vendor', () => {
  return download(paths.vendor)
    .pipe(gulp.dest('./public/js'));
});

gulp.task('minify-html', () => {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('minify-js', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});

gulp.task('minify-css', () => {
  return gulp.src('src/**/*.css')
    .pipe(cleancss({level: 2, debug: true}))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', gulp.parallel(
  'vendor',
  'minify-html',
  'minify-js',
  'minify-css',
));
