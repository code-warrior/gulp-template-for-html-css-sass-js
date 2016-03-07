# Validate HTML

This task validates HTML pages. If no errors are found, the Gulp task will simply move down a line, reporting the task is done. On error, however, you’ll receive one or more messages about your HTML errors. These errors are reported as having been found at line and column values. For example, 1.5 means an error on line 1, column 5. Regardless of whether your HTML validates or not, no files are copied to any destination folder.

# Compile CSS for Development Work
This task looks for a single Sass file (`sassSourceFileForDev`), compiles the CSS from it, and writes the resulting file to the `cssDevDestinationFolder`. The final CSS file will be formatted with 2-space indentations. Any floating-point calculations will be carried out 10 places, and browser-specific prefixes will be added to support 2 browser versions behind all current browsers’ versions.

# Compile All JavaScript Files Into One File for Development Work
This task compiles `preCompiledJavaScriptFilesWithGrid` via the `compileJavaScript` concatenator, then writes the result to the `javaScriptDevTargetFolder` with filename `javaScriptTargetFilename`.

# Lint JavaScript
This task lints JavaScript using the linter defined by `JSLinter`, the second pipe in this task. (ESLint is the linter in this case.) In order to generate a linting report, the multiple JS files in the `preCompiledJSFilesWithoutGrid` are compiled into a single, memory-cached file with a temporary name, then sent to the linter for processing.

 Note: The temporary file is *not* written to a destination folder.

# Serve
Used for development only, this task compiles CSS via Sass, concatenates one or more JavaScript files into a single file, lints JavaScript, then, finally, validates HTML.

The localhost server looks for `index.html` as the first page to load from either the temporary folder (`devTargetFolder`), the development folder (`devSourceFolder`), or the folder containing HTML (`devSourceFolder + '/' + HTMLSourceFolder`).

Files that require pre-processing must be written to a folder before being served. Thus, this task serves CSS and JS from a temp folder, the development target folder (`devTargetFolder`), while un-processed files, such as fonts and images, are served from the development source folder (`devSourceFolder`).

If a JS file is changed, all JS files are rebuilt, the resulting file is linted, and the browser reloads.

If a Sass file is changed, a re-compilation of the primary CSS file is generated, and the browser reloads.

Finally, changes to images also trigger a browser reload.
