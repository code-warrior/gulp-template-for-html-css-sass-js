# A Set of Gulp v5.x.x Tasks for Creating Web Projects Using HTML, CSS/Sass, and JavaScript

(v5.0.0)

---

## Before You Start

1. Ensure Java is installed, because Gulp requires it for events such as browser refreshing.
2. Node version `v22.14.0` was used to develop this project. Make sure you’re running *at least* that version.
3. CLI version of Gulp is `3.0.0`. Ensure you’re using `3.0.0` of Gulp’s CLI.

---

## Installation

From the root folder, type `npm install`. This will create a folder called `node_modules` and download the plugins listed under the `devDependencies` section in the `package.json` file. If you encounter an `ERR!` message about `EACCES` on macOS, then run the command as the super user: `sudo npm install`.

---

## Tasks

Typing `gulp --tasks`, or simply `gulp`, will render a list of tasks included in `gulpfile.js`. Tasks such as `build` and `serve` invoke other tasks and are executed in `<series>`.

Each task can be run on its own. For example, if all you want to do is validate your HTML, you can type `gulp validateHTML`.

---

## Running the Project

All your work must be added to the sub-folders under the `dev` folder: your markup in `html`, your Sass/CSS in `styles`, your JavaScript in `scripts`, and, your images in `img`.

Run `gulp serve` while you’re developing your project. This will initiate multiple development-related tasks, then launch your default browser. File changes trigger a browser reload. Transpiled files (`.js` and `.css`) are written to the `temp` folder.

For production-ready projects, run `gulp build`, which creates a folder called `prod`. This is the folder you’d upload to your server if you were going live with your project.

---

## Test Environments

* macOS Sequoia with Apple M2 Pro chip
* macOS Ventura with Intel chip
* PowerShell in Windows 11
* Cygwin in Windows 11
