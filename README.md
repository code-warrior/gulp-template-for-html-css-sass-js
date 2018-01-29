# A Gulp Task for HTML, Sass/CSS, and JavaScript

(v3.0.1)

---

## Installation
You need to have Java installed before continuing, as the browser refresh module requires it. Additionally, all the required Node modules need to be installed before you can use this template. From the root folder of this project, type `npm install`. This will create a folder called `node_modules` and download the plugins listed under the `devDependencies` section in the `package.json` file. If you encounter an `ERR!` message about `EACCES`, then you’ll need to run the command as the super user: `sudo npm install`. Because the Gulp tasks amount to about 157MB, expect to wait.

## Tasks
Typing `gulp --tasks`, or simply `gulp`, will provide you with a list of tasks included in `gulpfile.js`. Tasks such as `build` and `serve` invoke other tasks and are nested in the output of `gulp --tasks`.

Each task can be run on its own. For example, if all you want to do is validate your HTML, you can type `gulp validateHTML`, and if the task runs to completion without any messages, it means your HTML is valid and W3-compliant.

Above each task in the `gulpfile.js` file is an elaborate comment discussing what each task does.

## Running the Project
All your work must be added to the sub-folders under the `dev` folder: your markup in `html`, your Sass/CSS in `styles`, your JavaScript in `scripts`, and your images in `img`.

For development, run `gulp serve`, which runs multiple development-related tasks, then launches your default browser and listens for changes. Gulp keeps you informed via The Terminal. You can now work on your project as you normally would. Each time you save a file, your browser will refresh so you don’t have to.

For production-ready projects, run `build`, which creates a folder called `prod`. This is the folder you’d upload to your server if you were going live with your project.
