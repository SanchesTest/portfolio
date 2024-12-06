import gulp from 'gulp';
import webpack from 'webpack-stream';
import * as sass from 'sass'; // Изменено на импорт с использованием * для корректности
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssmin from 'gulp-cssmin';
import imagemin from 'gulp-imagemin';

const { series, src, dest, watch } = gulp;

// Настройка путей
const paths = {
  scripts: {
    src: './src/js/main.js',
    dest: './dist/js',
    allScripts: './src/js/**/*.js',
  },
  styles: {
    src: './src/sass/*.sass',
    dest: './dist/css',
    allStyles: './src/sass/**/*.sass',
  },
  img: {
    src: './src/img/*',
    dest: './dist/img/',
  },
  html: {
    src: './src/*.html',
    dest: './dist',
  },
};

// ========================================
// Build JS
// ========================================
function buildJs() {
  return src(paths.scripts.src)
    .pipe(
      webpack({
        mode: 'production',
        output: {
          filename: 'main.js',
        },
        watch: false,
        devtool: 'source-map',
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules)/,
              resolve: {
                fullySpecified: false,
              },
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        corejs: 3,
                        useBuiltIns: 'usage',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(paths.scripts.dest));
}

// ========================================
// Build CSS
// ========================================
const gulpSassCompiler = gulpSass(sass); // Создаем экземпляр gulpSass с использованием Dart Sass

function buildStyles() {
  return src(paths.styles.src)
    .pipe(gulpSassCompiler({ 
      outputStyle: 'expanded' // Устанавливаем стиль вывода, при необходимости
    }).on('error', gulpSassCompiler.logError)) // Обработка ошибок компиляции
    .pipe(autoprefixer({
      cascade: false
    }))
    // .pipe(cssmin())
    .pipe(dest(paths.styles.dest));
}

// ========================================
// Minify Images
// ========================================
function imagesMin() {
  return src(paths.img.src)
    .pipe(imagemin())
    .pipe(dest(paths.img.dest));
}

// ========================================
// Build HTML
// ========================================
function buildHtml() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest));
}

// ========================================
// Watch files
// ========================================
function watchFiles() {
  watch(paths.scripts.allScripts, buildJs);
  watch(paths.styles.allStyles, buildStyles);
  watch(paths.html.src, buildHtml);
  watch(paths.img.src, imagesMin);
}

// Default task for development
const dev = series(buildHtml, buildStyles, buildJs, imagesMin, watchFiles);
export default dev;
