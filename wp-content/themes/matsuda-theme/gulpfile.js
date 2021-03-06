/**
 * Gulpfile.
 *
 * A simple implementation of Gulp.
 *
 * Implements:
 * 			1. Live reloads browser with BrowserSync.
 * 			2. CSS: Sass to CSS conversion, error catching, Autoprixing, Sourcemaps,
 * 				CSS minification, and Merge Media Queries.
 * 			3. JS: Concatenates & uglifies Vendor and Custom JS files.
 * 			4. Images: Minifies PNG, JPEG, GIF and SVG images.
 * 			5. Watches files for changes in CSS or JS.
 * 			6. Watches files for changes in PHP.
 *
 *
 * @since 1.0.0
 * @author Ahmad Awais (@mrahmadawais)
 */

/**
 * Configuration.
 *
 * Project Configuration for gulp tasks.
 *
 * In paths you can add <<glob or array of globs>>
 *
 * Edit the variables as per your project requirements.
 */

var project              = 'MatsudaTheme'; // Project Name.
var projectURL           = 'matsuda.dev:8080'; // Project URL. Could be something like localhost:8888.
var productURL           = './'; // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.


var styleSRC             = './assets/css/style.scss'; // Path to main .scss file.
var styleDestination     = './'; // Path to place the compiled CSS file.
// Defualt set to root folder.


var jsVendorSRC          = './assets/js/vendors/*.js'; // Path to JS vendors folder.
var jsVendorDestination  = './assets/js/'; // Path to place the compiled JS vendors file.
var jsVendorFile         = 'vendors'; // Compiled JS vendors file name.
// Default set to vendors i.e. vendors.js.


var jsCustomSRC          = './assets/js/custom/*.js'; // Path to JS custom scripts folder.
var jsCustomDestination  = './assets/js/'; // Path to place the compiled JS custom scripts file.
var jsCustomFile         = 'custom'; // Compiled JS custom file name.
// Default set to custom i.e. custom.js.


var imagesSRC            = './assets/img/raw/**/*.{png,jpg,gif,svg}'; // Source folder of images which should be optimized.
var imagesDestination    = './assets/img/'; // Destination folder of optimized images. Must be different from the imagesSRC folder.


// Watch files paths.
var styleWatchFiles      = './assets/css/**/*.scss'; // Path to all *.scss files inside css folder and inside them.
var vendorJSWatchFiles   = './assets/js/vendors/*.js'; // Path to all vendors JS files.
var customJSWatchFiles   = './assets/js/custom/*.js'; // Path to all custom JS files.
var projectPHPWatchFiles = './**/*.php'; // Path to all PHP files.

var eslintErrorOccured   = false;


// Browsers you care about for autoprefixing.
// Browserlist https://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
  ];


/**
 * Load Plugins.
 *
 * Load gulp plugins and assing them semantic names.
 */
var gulp         = require('gulp'); // Gulp of-course

// CSS related plugins.
var sass         = require('gulp-sass'); // Gulp pluign for Sass compilation.
var postcss      = require('gulp-postcss');
//var autoprefixer = require('autoprefixer'); // Autoprefixing magic.
var cssnext      = require('postcss-cssnext');
var mqpacker     = require('css-mqpacker');
var comments     = require('postcss-discard-comments');
var cssnano      = require('cssnano'); // Minifies CSS files.

// JS related plugins.
var concat       = require('gulp-concat'); // Concatenates JS files
var uglify       = require('gulp-uglify'); // Minifies JS files
var eslint       = require('gulp-eslint');
var friendlyFormatter = require("eslint-friendly-formatter");

// Image realted plugins.
var imagemin     = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// Utility related plugins.
var rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var filter       = require('gulp-filter'); // Enables you to work on a subset of the original files by filtering them using globbing.
var sourcemaps   = require('gulp-sourcemaps'); // Maps code in a compressed file (E.g. style.css) back to it’s original position in a source file (E.g. structure.scss, which was later combined with other css files to generate style.css)
var notify       = require('gulp-notify'); // Sends message notification to you
var browserSync  = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
var reload       = browserSync.reload; // For manual browser reload.
var plumber      = require('gulp-plumber');
var gutil        = require("gulp-util");


/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 *
 * This task does the following:
 * 		1. Sets the project URL
 * 		2. Sets inject CSS
 * 		3. You may define a custom port
 * 		4. You may want to stop the browser from openning automatically
 */
 gulp.task( 'browser-sync', function() {
 	browserSync.init( {

 		// For more options
 		// @link http://www.browsersync.io/docs/options/

 		// Project URL.
 		proxy: projectURL,

 		// Stop the browser from automatically opening.
 		open: true,

 		// Inject CSS changes.
 		// Comment it to reload browser for every CSS change.
 		//injectChanges: true,

 		// Use a specific port (instead of the one auto-detected by Browsersync).
 		// port: 7000,

 	} );
 });


/**
 * Task: `styles`.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 * 		1. Gets the source scss file
 * 		2. Compiles Sass to CSS
 * 		3. Writes Sourcemaps for it
 * 		4. Autoprefixes it and generates style.css
 * 		5. Renames the CSS file with suffix .min.css
 * 		6. Minifies the CSS file and generates style.min.css
 * 		7. Injects CSS or reloads the browser via browserSync
 */
gulp.task('styles', function () {

  var processors = [
    //autoprefixer({browsers: AUTOPREFIXER_BROWSERS}),
    cssnext,
    mqpacker
  ];

  var processorsMin = [
    //comments({removeAllButFirst: true}),
    cssnano()
  ];

 	gulp.src( styleSRC )
		.pipe( sourcemaps.init() )
		.pipe( sass( {
			errLogToConsole: true,
			outputStyle: 'compact',
			//outputStyle: 'compressed',
			// outputStyle: 'nested',
			// outputStyle: 'expanded',
			precision: 10
		} ) )
		.on('error', console.error.bind(console))
    .pipe(postcss(processors))
    .pipe( gulp.dest( styleDestination ) )
		.pipe( rename( { suffix: '.min' } ) )
    .pipe(postcss(processorsMin))
    .pipe( sourcemaps.write(styleDestination) )
		.pipe( gulp.dest( styleDestination ) )
		.pipe( browserSync.stream() )
		.pipe( notify( { message: 'TASK: "styles" Completed!', onLast: true } ) )
});


/**
 * Task: `vendorJS`.
 *
 * Concatenate and uglify vendor JS scripts.
 *
 * This task does the following:
 * 		1. Gets the source folder for JS vendor files
 * 		2. Concatenates all the files and generates vendors.js
 * 		3. Renames the JS file with suffix .min.js
 * 		4. Uglifes/Minifies the JS file and generates vendors.min.js
 */
gulp.task( 'vendorsJs', function() {
	gulp.src( jsVendorSRC )
		.pipe( concat( jsVendorFile + '.js' ) )
		.pipe( gulp.dest( jsVendorDestination ) )
		.pipe( rename( {
			basename: jsVendorFile,
			suffix: '.min'
		}))
		.pipe( uglify() )
		.pipe( gulp.dest( jsVendorDestination ) )
		.pipe( notify( { message: 'TASK: "vendorsJs" Completed!', onLast: true } ) );
});

/**
 * Task: `customJS`.
 *
 * Concatenate and uglify custom JS scripts.
 *
 * This task does the following:
 * 		1. Gets the source folder for JS custom files
 * 		2. Concatenates all the files and generates custom.js
 * 		3. Renames the JS file with suffix .min.js
 * 		4. Uglifes/Minifies the JS file and generates custom.min.js
 */
gulp.task( 'customJS', ['lint'], function() {

  if (eslintErrorOccured) {
    eslintErrorOccured = false;
  }else{
    gulp.src( jsCustomSRC )
      .pipe( concat( jsCustomFile + '.js' ) )
      .pipe( gulp.dest( jsCustomDestination ) )
      .pipe( rename( {
        basename: jsCustomFile,
        suffix: '.min'
      }))
      .pipe( uglify() )
      .pipe( gulp.dest( jsCustomDestination ) )
      .pipe( notify( { message: 'TASK: "customJs" Completed!', onLast: true } ) );
  }

});




/**
 * Task: `lint`.
 *
 * Custom JS scripts linter.
 */
gulp.task('lint', function () {
  return gulp.src([jsCustomSRC])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    .pipe(plumber({
      errorHandler: function (err) {
        eslintErrorOccured = true;
        notify.onError({
          title:    "Eslint Error",
          message:  "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    .pipe(eslint.results(function (results) {
      // Called once for all ESLint results.
      console.log('Total Results: ' + results.length);
      console.log('Total Warnings: ' + results.warningCount);
      console.log('Total Errors: ' + results.errorCount);

      if(results.errorCount){
        throw new gutil.PluginError({
          plugin: eslint,
          message: 'Something happend: Error message!'
        });
      }

    }))

    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format(friendlyFormatter))
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});


/**
 * Task: `images`.
 *
 * Minifies PNG, JPEG, GIF and SVG images.
 *
 * This task does the following:
 * 		1. Gets the source of images raw folder
 * 		2. Minifies PNG, JPEG, GIF and SVG images
 * 		3. Generates and saves the optimized images
 *
 * This task will run only once, if you want to run it
 * again, do it with the command `gulp images`.
 */
gulp.task( 'images', function() {
	gulp.src( imagesSRC )
		.pipe( imagemin( {
					progressive: true,
					optimizationLevel: 3, // 0-7 low-high
					interlaced: true,
					svgoPlugins: [{removeViewBox: false}]
				} ) )
		.pipe(gulp.dest( imagesDestination ))
		.pipe( notify( { message: 'TASK: "images" Completed!', onLast: true } ) );
});


/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task( 'default', ['styles', 'vendorsJs', 'customJS', 'images', 'browser-sync'], function () {
	gulp.watch( projectPHPWatchFiles, reload); // Reload on PHP file changes.
	gulp.watch( styleWatchFiles, [ 'styles' ] ); // Reload on SCSS file changes.
	gulp.watch( vendorJSWatchFiles, [ 'vendorsJs', reload ]  ); // Reload on vendorsJs file changes.
	gulp.watch( customJSWatchFiles, [ 'customJS', reload ]  ); // Reload on customJS file changes.
});
