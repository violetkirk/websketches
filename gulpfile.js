var gulp = require('gulp');
var sass = require('gulp-sass');
//replaced livereload with server-livereload
var server = require('gulp-server-livereload');
var notify = require('gulp-notify');

gulp.task('js', function() {
    gulp.src('src/**/*.js')
      .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  gulp.src('src/css/*.css')
  .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function(){
  gulp.src('src/**/*.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('sass', ['css'], function(){
  gulp.src('src/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function(){
  gulp.src('src/**/*.png')
  .pipe(gulp.dest('dist/img'));
});

// **** new stuff after here ****


//put all of our build processes in one function for easy reference
gulp.task('build', ['sass', 'js', 'html','images'], function(){
    gulp.src('')
    .pipe(notify('Done!'));
});

//this sets up a local webserver
gulp.task('server', ['build'], function(){
  //what files to serve (note slightly different src format for web servers)
  gulp.src('./dist/')
  .pipe(server({
    //which port to host on. Should be in the 8000's
    port: 8001,
    livereload:true,
    //open the browser automagically
    open: true,
    //which file to serve by default (if you don't do the directoryListing)
    defaultFile: 'dist/test1.html',
    //tell it to show all the files when it opens. The settings are an object
    directoryListing: {
      //turn it on
      enable: true,
      //what path to show a directory of
      path: './dist/'
    }
  }))
})

//run the server when you start default (which in turn runs 'build')
gulp.task('default', ['server'] , function() {
  //broke up the watch task by file type so it's faster!
    gulp.watch('src/**/*.js',['js']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.png', ['images']);
    //this one really benefits us, since livereload can inject CSS without reloading.
    gulp.watch(['src/**/*.scss', 'src/**/*.css'], ['sass']);
});
