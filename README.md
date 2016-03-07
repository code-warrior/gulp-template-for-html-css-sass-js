# An Elaborate Gulp Task for HTML, Sass/CSS, and JavaScript

## Installation
All the node modules need to be installed before you can use this template. From the root of this project, type `npm install`, which will create a folder called `node_modules` and download myriad JavaScript files. If you encounter an `ERR!` message about `EACCES`, then you’ll need to run the command as the super user: `sudo npm install`.

Because the 13 Gulp tasks amount to about 220MB, expect to wait.

## Tasks
Typing `gulp --tasks` will provide you with a list of tasks included in `gulpfile.js`. Tasks such as `build` and `serve` invoke other tasks, which are nested in the output of `gulp --tasks`.

Each task can be run on its own. For example, if all you want to do is validate your HTML, you can type `gulp validateHTML`, and if the task runs to completion without any messages, it means your HTML is valid and W3-compliant.

Above each task in the `gulpfile.js` file is an elaborate comment discussing what each task does.

## Individual Tasks as Branches

Each of the 13 tasks has been broken out into its own branch, and the full `gulpfile` is available without comments and without variables. You can view all the branches with `git branch -r`.

## Running the Project
For development, run `gulp serve`, which runs multiple development-related tasks, then launches your default browser and listens for changes. Gulp keeps you informed via The Terminal. You can now work on your project as you normally would. Each time you save a file, your browser will refresh so you don’t have to.

## About the Example
The example in this project is taken from [https://github.com/code-warrior/abraham-lincoln-assassination-trivia](https://github.com/code-warrior/abraham-lincoln-assassination-trivia) and not meant to be elaborate. It’s only purpose is to show you how to stand up a web project that uses HTML, Sass/CSS, and JavaScript. Compare the scaffolding of the original project to this one in order to get a better idea of how this template is structured.

## About the Scaffold
All your work must be added to the sub-folders under the `dev` folder: your markup in `html`, your Sass/CSS in `styles`, your JavaScript in `scripts`, and your images in `img`.

Running `build` creates a folder called `prod`, which is the production version of your project. This is the folder you’d upload to your server if you were going live with your project.
