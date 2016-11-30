var gulp = require('gulp');
var plugins = require('./gulp-config/plugins');
var pathFiles = require('./gulp-config/path');
var functions = require('./gulp-config/functions');

var runTask = function (nameTask){
    return require("./gulp-config/tasks/" + nameTask)(gulp, pathFiles, plugins, functions)
};

runTask("gulp_css").run();
runTask("gulp_icons").run();
runTask("gulp_fonts").run();
runTask("gulp_prod").run();

gulp.task('default', function(cb) {
    plugins.runSequence("icons", "fonts", "css:general", "css:components", cb);
});
