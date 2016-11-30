function Task(gulp, pathFiles, plugins, functions){

    var runTasks = function () {
        gulp.task('css:general', function() {
            var processors = [
                plugins.lost(),
                plugins.autoprefixer(),
                plugins.cssmqpacker()
            ];
            if (functions.isProduction()) {
                processors.push(plugins.cssnano());
            }

            return gulp.src(pathFiles.src.styles + "/styles.styl")
                .pipe(plugins.stylus({
                    use     : [plugins.rupture()]
                }))
                .pipe(plugins.postcss(processors))
                .pipe(plugins.urlVersion({lastcommit: true}))
                .pipe(gulp.dest(pathFiles.base))
                .on('end', functions.successHandler);
        });

        gulp.task('css:components', function() {
            var processors = [
                plugins.lost(),
                plugins.autoprefixer(),
                plugins.cssmqpacker()
            ];
            if (functions.isProduction()) {
                processors.push(plugins.cssnano());
            }
            return gulp.src(pathFiles.src.app + "/**/*.styl", {base: "./"})
                .pipe(plugins.stylus({
                    use     : [plugins.rupture()]
                }))
                .pipe(plugins.postcss(processors))
                .pipe(plugins.urlVersion({lastcommit: true}))
                .pipe(gulp.dest("./"))
                .on('end', functions.successHandler);
        });
        gulp.task('css', function(cb) {
            plugins.runSequence("css:general", "css:components", cb);
        });
    }

    return {
        run : runTasks
    }
}

module.exports = Task;
