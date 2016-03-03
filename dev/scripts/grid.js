var body = document.querySelector('body'),
    firstChildOfBody = body.firstElementChild,
    gridLayer = document.createElement('div'),
    gridChoice = 0;

gridLayer.setAttribute('id', 'column-baseline-grid');

if (null !== firstChildOfBody) {
    body.insertBefore(gridLayer, firstChildOfBody);
} else {
    body.textContent = 'The body element does not have a child element.';
}

document.onkeydown = function (evnt) {
    if (27 === evnt.keyCode) {
        switch (gridChoice) {
            case 0:
                gridLayer.classList.add('column-grid');
                gridLayer.classList.remove('user-supplied-bg-image');

                break;

            case 1:
                gridLayer.classList.remove('column-grid');
                gridLayer.classList.add('modular-grid');

                break;

            case 2:
                gridLayer.classList.remove('modular-grid');
                gridLayer.classList.add('baseline-grid');

                break;

            case 3:
                gridLayer.classList.remove('baseline-grid');
                gridLayer.classList.add('all-grids');

                break;

            case 4:
                gridLayer.classList.remove('all-grids');
                gridLayer.classList.add('user-supplied-bg-image');

                break;

            case 5:
                gridLayer.classList.remove('user-supplied-bg-image');
                break;
        }

        if (gridChoice++ === 5) {
            gridChoice = 0;
        }
    }
};
