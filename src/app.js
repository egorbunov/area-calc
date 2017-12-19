import {
    enterPolyDrawState,
    exitPolyDrawState,
    getPoly,
    polyFinished,
} from './polydraw';
import {
    enterScaleSetupState,
    exitScaleSetupState,
    getScale,
} from './scalesetup';
import {setBackplate, enterAdjustBackplateState} from './backplate';
import {getArea} from './geom';

// initializing canvas
const canvas = document.getElementById('pcanvas');
const backCanvas = document.getElementById('back-canvas');

canvas.width = window.outerWidth * 0.65;
canvas.height = window.outerHeight * 0.8;
backCanvas.width = window.outerWidth;
backCanvas.height = window.outerHeight;

// setup backplate drawing
document.getElementById('backplate').onclick = function() {
    this.value = null;
};
document.getElementById('backplate').onchange = function() {
    setBackplate();
};

// states
const NONE_STATE = 0;
const DRAW_POLY_STATE = 1;
const SETUP_SCALE_STATE = 2;
let curState = NONE_STATE;

/**
 * Changes view state calling exit/enter state functions
 * @param {*} newState desired view state
 */
function goState(newState) {
    switch (curState) {
    case DRAW_POLY_STATE:
        exitPolyDrawState();
        break;
    case SETUP_SCALE_STATE:
        exitScaleSetupState();
        break;
    default:
    }
    curState = newState;
    switch (newState) {
    case DRAW_POLY_STATE:
        enterPolyDrawState();
        break;
    case SETUP_SCALE_STATE:
        enterScaleSetupState();
        break;
    default:
    }
}

document.getElementById('draw-path').onclick = function() {
    goState(DRAW_POLY_STATE);
};

document.getElementById('setup-scale').onclick = function() {
    goState(SETUP_SCALE_STATE);
};

document.getElementById('calc-area').onclick = function() {
    if (!polyFinished()) {
        return;
    }
    const scale = getScale();
    // area grows quadratically
    const area = getArea(getPoly()) * scale * scale;
    document.getElementById('area').innerText = area.toFixed(3).toString();
};

// setting up backplate stuff
enterAdjustBackplateState();

