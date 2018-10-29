const gulp = require('gulp')
const yaml = require('gulp-yaml')
const gje = require('gulp-json-editor')
const exec = require('gulp-exec')
const rename = require('gulp-rename')

const swaggerGenerateAngular = 'java -jar swagger/swagger-codegen-cli-2.3.1.jar generate -c swagger/config.json -i swagger/swagger.json -l typescript-angular -o libs/swagger'
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

gulp.task('default', ['swagger'])
