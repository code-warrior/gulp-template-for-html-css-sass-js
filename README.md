# LINT JAVASCRIPT
This task lints JavaScript using the linter defined by JSLinter, the second pipe in this task. (ESLint is the linter in this case.) In order to generate a linting report, the multiple JS files in the preCompiledJSFilesWithoutGrid are compiled into a single, memory-cached file with a temporary name, then sent to the linter for processing.

**Note**: This version of the lintJS task writes the linted JS file to a destination directory
