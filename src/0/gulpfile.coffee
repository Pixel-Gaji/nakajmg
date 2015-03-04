gulp       = require "gulp"
babel      = require "gulp-babel"
concat     = require "gulp-concat"
rename     = require "gulp-rename"
plumber    = require "gulp-plumber"
notify     = require "gulp-notify"
uglify     = require "gulp-uglify"
babelify   = require "babelify"
browserify = require "browserify"
source     = require "vinyl-source-stream"
buffer     = require "vinyl-buffer"
bs         = require "browser-sync"
stylus     = require "gulp-stylus"

src = "./src/js/App.es6.js"
styl = "./src/styl/**/*.styl"


dist = 
  js: "./dist/js/"
  css: "./dist/css/"

name =
  js: "app.js"
  min: "app.min.js"

gulp.task "stylus", ->
  gulp.src styl
    .pipe do stylus
    .pupe gulp.dest dist.css

gulp.task "build", ["babelify"], ->
  gulp.src "#{dist}#{name.js}"
    .pipe do uglify
    .pipe rename name.min
    .pipe gulp.dest dist.js
  
gulp.task "babelify", ->
  browserify({
    # debug: true
    extensions: [".es6.js"]
    standalone: "DemoLogger"
  })
  .transform babelify.configure ({ blacklist: ["useStrict"] })
  .require(src, entry: true)
  .bundle()
  .on "error", (err) ->
    console.log "Error: #{err.message}"
    @emit "end"
  .pipe source name.js
  .pipe gulp.dest dist.js

gulp.task "default", ->
  bs.init
    server:
      baseDir: ["src"]
      directory: true
    notify: false
    host: "localhost"
  
  # gulp.watch ["src/js/**/*.es6.js"], ["babelify", bs.reload]
  gulp.watch ["src/index.html"], bs.reload
  gulp.watch ["src/js/**/*.js"], bs.reload

gulp.task "watch", ["default"]
