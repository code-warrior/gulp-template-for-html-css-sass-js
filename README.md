# A Set of Gulp v4.0.0 Tasks for Creating Web Projects Using HTML, CSS/Sass, and JavaScript

(v4.0.2)

---

## Installation
Before continuing, make sure Java is installed, as the browser refresh module requires it. Additionally, all the required Node modules need to be installed before you can use this template. From the root folder, type `npm install`. This will create a folder called `node_modules` and download the plugins listed under the `devDependencies` section in the `package.json` file. If you encounter an `ERR!` message about `EACCES` on macOS, then run the command as the super user: `sudo npm install`.

## Tasks
Typing `gulp --tasks`, or simply `gulp`, will render a list of tasks included in `gulpfile.js`. Tasks such as `build` and `serve` invoke other tasks and are executed in `<series>`.

Each task can be run on its own. For example, if all you want to do is validate your HTML, you can type `gulp validateHTML`.

## Running the Project
All your work must be added to the sub-folders under the `dev` folder: your markup in `html`, your Sass/CSS in `styles`, your JavaScript in `scripts`, and, your images in `img`.

During development, run `gulp serve`, which runs multiple development-related tasks, then launches your default browser and reloads on file changes. Transpiled files (`.js` and `.css`) are written to the `temp` folder.

For production-ready projects, run `build`, which creates a folder called `prod`. This is the folder you’d upload to your server if you were going live with your project.

## Issues

* As of 22 February 2023, this project is currently not compatible with macOS Ventura (10.13).

* As of 14 October 2021, you’ll need to have [`stylelint` installed](https://stylelint.io/user-guide/get-started) to run `gulp-stylelint`, which is included in a task called `lintCSS`. However, there’s a bug in this project that, when adding the following to the `serve` task, the browser won’t reload on changes to CSS files.

```javascript
watch(`dev/styles/**/*.css`, lintCSS)
    .on(`change`, reload);
```
