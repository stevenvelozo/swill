/// ##### Part of the **[retold](https://stevenvelozo.github.io/retold/)** system
/**
* @license MIT
* @author <steven@velozo.com>
*/
// Build the scripts for CA4PRS from the simulator/ folder
var libBrowserify = require('browserify');

var libVinylSourceStream = require('vinyl-source-stream');
var libVinylBuffer = require('vinyl-buffer');

var libUglify = require('gulp-uglify');
var libSourcemaps = require('gulp-sourcemaps');
var libGulpUtil = require('gulp-util');

/**
* Compile scripts from a node module to browser module.
* These tasks are discrete from the standard build pipeline.
*
* @class runTasks
*/
var compileScripts = function(pFable)
{
	////////////////////////////////////////////////////////////////////
	//////////////////////// Run the Application ///////////////////////
	//================================================================//

	/********************************************************
	 * TASK: Build the minified module for the browser
	 *   This gulp task is taken from the gulp recipe repository:
	 *   https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
	 */
	pFable.gulp.task('compile-script',
		function ()
		{
			// set up the custom browserify instance for this task
			var tmpBrowserify = libBrowserify(
			{
				entries: pFable.settings.Compilation.EntryPoint,
				debug: true
			});

			return tmpBrowserify.bundle()
				.pipe(libVinylSourceStream(pFable.settings.Compilation.DestinationScript))
				.pipe(libVinylBuffer())
				.pipe(libSourcemaps.init({loadMaps: true}))
						// Add transformation tasks to the pipeline here.
						.pipe(libUglify())
						.on('error', libGulpUtil.log)
				.pipe(libSourcemaps.write('./'))
				.pipe(pFable.gulp.dest(pFable.settings.Compilation.Destination));
		}
	);


	/********************************************************
	 * TASK: Build the module for the browser
	 *   This gulp task is taken from the gulp recipe repository:
	 *   https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
	 */
	pFable.gulp.task('compile-script-debug',
		function ()
		{
			// set up the custom browserify instance for this task
			var tmpBrowserify = libBrowserify(
			{
				entries: pFable.settings.Compilation.EntryPoint
			});
			// Until we bundle modules with the right globals, don't worry about this.
			//tmpBrowserify.ignore('underscore');

			return tmpBrowserify.bundle()
				.pipe(libVinylSourceStream(pFable.settings.Compilation.DestinationScript))
				.pipe(libVinylBuffer())
						.on('error', libGulpUtil.log)
				.pipe(pFable.gulp.dest(pFable.settings.Compilation.Destination));
		}
	);
};

module.exports = compileScripts;
