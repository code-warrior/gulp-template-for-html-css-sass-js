/*jslint browser, es6 */
/*global window */

window.onload = function () {
    const CSSPreProcessor = `Sass`;
    const JSVersion = `ES6`;

    let body = document.querySelector(`body`);
    let paragraph = document.createElement(`p`);
    let text = document.createTextNode(`If you can see this content in blue with ` +
        `a light blue border, then ${CSSPreProcessor} and ${JSVersion} are ` +
        `working. Look at the “dev” folder for placing your HTML, Sass, and ` +
        `JavaScript.`);

    paragraph.appendChild(text);
    body.appendChild(paragraph);
};
