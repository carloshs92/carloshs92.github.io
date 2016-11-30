function Task(gulp, pathFiles, plugins, functions){
    var runTasks = function () {

        var builder          = new plugins.systemBuilder('', 'systemjs.config.js');
        var bundleHash       = new Date().getTime();
        var mainBundleName   = bundleHash + '.main.bundle.js';
        var vendorBundleName = bundleHash + '.vendor.bundle.js';
        var path = require('path');

        gulp.task('prod', function(done) {
            plugins.runSequence('default', 'clean', 'compile_ts', 'bundle', 'copy_assets', 'copy_component_assets', function() {
                done();
            });
        });

        gulp.task('bundle', ['bundle:vendor', 'bundle:app'], function () {
            return gulp.src('index.html')
                .pipe(plugins.htmlreplace({
                    'app': mainBundleName,
                    'vendor': vendorBundleName
                }))
                .pipe(gulp.dest('./dist'));
        });

        gulp.task('bundle:vendor', function () {
            return builder
                .buildStatic('app/vendor.js', './dist/' + vendorBundleName)
                .catch(function (err) {
                    console.log('Vendor bundle error');
                    console.log(err);
                });
        });

        gulp.task('bundle:app', function () {
            return builder
                .buildStatic('app/main.js', './dist/' + mainBundleName)
                .catch(function (err) {
                    console.log('App bundle error');
                    console.log(err);
                });
        });

        gulp.task('compile_ts', ['clean:ts'], plugins.shell.task([
            'tsc'
        ]));

        gulp.task('copy_assets', function() {
            return gulp.src(['./assets/fonts/icons-webfont/*', './assets/img/*', './styles.css'], {base:"."})
                .pipe(gulp.dest('./dist'));
        });

        gulp.task('copy_component_assets', function() {
            return gulp.src(['./app/**/*.html', './app/**/*.css'], {base:"."})
                .pipe(plugins.rename({dirname: ''}))
                .pipe(gulp.dest('./dist'));
        });

        gulp.task('clean', ['clean:ts', 'clean:dist']);

        gulp.task('clean:dist', function () {
            return gulp.src(['./dist'], {read: false})
                .pipe(plugins.clean());
        });

        gulp.task('clean:ts', function () {
            return gulp.src(['./app/**/*.js', './app/**/*.js.map'], {read: false})
                .pipe(plugins.clean());
        });
    }

    return {
        run : runTasks
    }

}

module.exports = Task;
