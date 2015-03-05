gulp       = require "gulp"
babel      = require "gulp-babel"
concat     = require "gulp-concat"
rename     = require "gulp-rename"
plumber    = require "gulp-plumber"
notify     = require "gulp-notify"
uglify     = require "gulp-uglify"
coffeeify  = require "coffeeify"
babelify   = require "babelify"
browserify = require "browserify"
source     = require "vinyl-source-stream"
buffer     = require "vinyl-buffer"
bs         = require "browser-sync"
stylus     = require "gulp-stylus"
coffee     = require "gulp-coffee"

src = "./src/js/App.es6.js"
styl = "./src/styl/**/*.styl"


dist = 
  js: "./dist/js/"
  css: "./dist/css/"
  coffee: "./dist/coffee/"

name =
  js: "app.js"
  min: "app.min.js"

gulp.task "stylus", ->
  gulp.src styl
    .pipe do stylus
    .pupe gulp.dest dist.css

gulp.task 

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

gulp.task "coffeeify", ->
  browserify({
    debug: true
    extensions: [".coffee"]
    # standalone: "main"
    # entries: ["./src/coffee/main.coffee"]
  })
  .transform coffeeify
  .require("./src/coffee/main.coffee",entry: true)
  .bundle()
  .on "error", (err) ->
    console.log "Error: #{err.message}"
    @emit "end"
  .pipe source "main.js"
  .pipe gulp.dest dist.coffee

gulp.task "default", ->
  bs.init
    server:
      baseDir: ["dist"]
      # baseDir: ["src"]
      directory: true
    notify: false
    host: "localhost"
  
  # gulp.watch ["src/js/**/*.es6.js"], ["babelify", bs.reload]
  gulp.watch ["src/index.html"], bs.reload
  # gulp.watch ["src/js/**/*.js"], bs.reload
  gulp.watch ["src/coffee/**/*.coffee"], ["coffeeify", bs.reload]

gulp.task "watch", ["default"]
