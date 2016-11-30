var Plugins = {};
// Plugins globals
Plugins.if            = require("gulp-if");
Plugins.runSequence   = require("run-sequence");
Plugins.fs            = require("fs");
Plugins.util          = require("gulp-util");
Plugins.notifier      = require("node-notifier");
// Plugins gulp icons
Plugins.iconfont      = require("gulp-iconfont");
// Plugins gulp fonts
Plugins.consolidate   = require("gulp-consolidate");
// Plugins gulp css
Plugins.lost          = require("lost");
Plugins.autoprefixer  = require("autoprefixer");
Plugins.cssmqpacker   = require("css-mqpacker");
Plugins.postcss       = require("gulp-postcss");
Plugins.rupture       = require("rupture");
Plugins.cssnano       = require("cssnano");
Plugins.stylus        = require("gulp-stylus");
Plugins.urlVersion    = require("gulp-css-url-versioner");
// Plugins gulp dist
Plugins.shell         = require('gulp-shell');
Plugins.clean         = require('gulp-clean');
Plugins.htmlreplace   = require('gulp-html-replace');
Plugins.rename        = require('gulp-rename');
Plugins.systemBuilder = require('systemjs-builder');

module.exports = Plugins;
