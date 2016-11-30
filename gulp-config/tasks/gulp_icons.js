function Task(gulp, pathFiles, plugins, functions){
    var runTasks = function () {
        gulp.task('icons', function() {
            return gulp.src(pathFiles.src.icons + "/*.svg")
                .pipe(plugins.iconfont({
                    normalize: true,
                    prependUnicode: false,
                    fontName: "icons-webfont",
                    formats: ["ttf", "eot", "woff", "svg"]
                }))
                .on('glyphs', function(codepoints) {
                    gulp.src(pathFiles.src.icons + '/_template/icons.styl')
                        .pipe(plugins.consolidate('lodash', {
                            glyphs: codepoints,
                            fontName: 'icons-webfont'
                        }))
                        .pipe(gulp.dest(pathFiles.src.styles + '/_elements'));
                })
                .pipe(gulp.dest(pathFiles.src.fonts + '/icons-webfont'));
        });
    }

    return {
        run : runTasks
    }
}

module.exports = Task;
