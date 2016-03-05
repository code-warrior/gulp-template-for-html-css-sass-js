# Copy Unprocessed Assets to the Production Folder
This task copies all unprocessed assets that aren’t images, JavaScript, or Sass/CSS in the devSourceFolder to the prodTargetFolder, because images, JS, and Sass/CSS are processed as follows:

— Images are compressed and copied by the copyImagesToProdFolder task.

— JavaScript is concatenated and compressed by the compileJSForProd task.

— Sass/CSS is concatenated and compressed by the compileCSSForProd task.
