const gulp = require('gulp')

const yaml = require('gulp-yaml')
const gje = require('gulp-json-editor')
const exec = require('gulp-exec')
const imagemin = require('gulp-imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')

const swaggerGenerateTsFetch = 'swagger-codegen generate -c swagger/config.json -i swagger/swagger.json -l typescript-fetch -o libs/swagger'

require('dotenv').config()

gulp.task('swagger', () => {
  gulp.src('swagger/swagger.yaml')
    .pipe(yaml({ space: 2 }))
    .pipe(gje((json) => {
      if (process.env.API_HOST !== undefined) {
        json.host = process.env.API_HOST
      }

      if (process.env.API_BASEPATH !== undefined) {
        json.basePath = process.env.API_BASEPATH
      }

      return json
    }))
    .pipe(gulp.dest('swagger/'))
    .pipe(exec(swaggerGenerateTsFetch, {
      continueOnError: true,
    }))
    .pipe(exec.reporter())
})

gulp.task('watch', () => {
  gulp.watch('swagger/swagger.yaml', ['swagger'])
})

gulp.task('imagemin', () =>
  gulp.src([
      'public/**/*.{png,gif,jpg}',
      'static/**/*.{png,gif,jpg}',
      'src/**/*.{png,gif,jpg}',
    ], { base: '.' })
    .pipe(imagemin([
      // imagemin.gifsicle({ interlaced: true }),
      // @TODO: play with png optimization level
      imagemin.optipng({ optimizationLevel: 2 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      }),
      // jpeg weight killer
      imageminMozjpeg({ quality: 80 })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('./'))
)

gulp.task('default', ['swagger', 'imagemin'])
