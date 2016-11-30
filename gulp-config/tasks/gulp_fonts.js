function Task(gulp, pathFiles, plugins, functions){
    var runTasks = function () {
        gulp.task('fonts', function() {
            var dirList = []
            plugins.fs.readdirSync(pathFiles.src.fonts + "/").forEach(function(file){
                if(/^[^_]*-webfont$/g.test(file)){
                    dirList.push(file)
                }
            });
            return gulp.src(pathFiles.src.fonts + '/_template/fonts.styl')
                .pipe(plugins.consolidate('lodash', { dirList: dirList }))
                .pipe(gulp.dest(pathFiles.src.styles + '/_elements'));
        });
    }

    return {
        run : runTasks
    }
}

module.exports = Task;
