/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = drawBase;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return drawRuler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return drawPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return drawLine; });
/* unused harmony export putAreaText */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(1);


function drawBase(canvas) {
    const shift = 20;
    drawRuler(canvas, [shift, shift*2], [shift, canvas.height - shift], 10, 25);
    drawRuler(canvas, [shift*2, shift], [canvas.width - shift, shift], 10, 25);
}

/**
 * Draws ruler
 */
function drawRuler(canvas, from, to, tickSz, tickStep) {
    const ctx2D = canvas.getContext('2d');
    drawLine(ctx2D, from[0], from[1], to[0], to[1], 1);

    ctx2D.beginPath();
    ctx2D.font = '9px Arial';
    ctx2D.fillStyle = 'black';

    let start = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](from[0], from[1]);
    const end = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](to[0], to[1]);
    const totSteps = end.clone().subtract(start).length() / tickStep;
    const step = end.clone().subtract(start).normalize();
    for (let i = 0; i < totSteps; i++) {
        const tick = step.clone().multiply(tickSz);
        tick.rotate(Math.PI/2);
        const from = tick.clone().negative().multiply(0.5).add(start);

        drawLine(ctx2D, from.x, from.y, from.x+tick.x, from.y+tick.y, 1);
        // ctx2D.fillText(
        //     parseInt(0 + i*tickStep, 10).toString(),
        //     start.x+tick.x, start.y+tick.y
        // );
        start.add(step.clone().multiply(tickStep));
    }

    ctx2D.stroke();
}

function drawPoint(ctx2D, x, y, rad, color) {
    ctx2D.beginPath();
    ctx2D.arc(x, y, rad, 0, Math.PI*2, true);
    ctx2D.fillStyle = color;
    ctx2D.fill();
}

function drawLine(ctx2D, fromX, fromY, toX, toY, wid) {
    ctx2D.beginPath();
    ctx2D.moveTo(fromX, fromY);
    ctx2D.lineTo(toX, toY);
    ctx2D.lineWidth = wid;
    ctx2D.stroke();
}

function putAreaText(ctx2D, area, x, y) {
    ctx2D.font = '30px Arial';
    ctx2D.fillText('Area: ' + area.toFixed(3).toString(), x, y);
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    negative() {
        this.x = -this.x;
    this.y = -this.y;
        return this;
    }

    add(v) {
        if (v instanceof Vector) {
            this.x += v.x;
            this.y += v.y;
        } else {
            this.x += v;
            this.y += v;
        }
        return this;
    }

    subtract(v) {
        if (v instanceof Vector) {
            this.x -= v.x;
            this.y -= v.y;
        } else {
            this.x -= v;
            this.y -= v;
        }
        return this;
    }

    multiply(v) {
        if (v instanceof Vector) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }

    divide(v) {
        if (v instanceof Vector) {
            if (v.x != 0) this.x /= v.x;
            if (v.y != 0) this.y /= v.y;
        } else {
            if (v != 0) {
                this.x /= v;
                this.y /= v;
            }
        }
        return this;
    }

    equals(v) {
        return this.x == v.x && this.y == v.y;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    length() {
        return Math.sqrt(this.dot(this));
    }
    normalize() {
        return this.divide(this.length());
    }

    min() {
        return Math.min(this.x, this.y);
    }

    max() {
        return Math.max(this.x, this.y);
    }
    toAngles() {
        return -Math.atan2(-this.y, this.x);
    }

    angleTo(a) {
        return Math.acos(this.dot(a) / (this.length() * a.length()));
    }

    toArray(n) {
        return [this.x, this.y].slice(0, n || 2);
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    set(x, y) {
        this.x = x; this.y = y;
        return this;
    }

    rotate(a) {
        const c = Math.cos(a);
        const s = Math.sin(a);
        const x = this.x * c - this.y * s;
        const y = this.x * s + this.y * c;
        this.x = x;
        this.y = y;
        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polydraw__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scalesetup__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__backplate__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__draw__ = __webpack_require__(0);






// initializing canvas
const canvas = document.getElementById('pcanvas');
const backCanvas = document.getElementById('back-canvas');
canvas.width = window.outerWidth * 10/13;
canvas.height = window.outerHeight * 0.8;
backCanvas.width = window.outerWidth;
backCanvas.height = window.outerHeight;

// setup backplate drawing
document.getElementById('backplate').onclick = function() {
    this.value = null;
};
document.getElementById('backplate').onchange = function() {
    Object(__WEBPACK_IMPORTED_MODULE_2__backplate__["a" /* setBackplate */])();
};

// states
const NONE_STATE = 0;
const DRAW_POLY_STATE = 1;
const SETUP_SCALE_STATE = 2;
let curState = NONE_STATE;

function enterDefaultState() {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    Object(__WEBPACK_IMPORTED_MODULE_4__draw__["a" /* drawBase */])(canvas);
}

/**
 * Changes view state calling exit/enter state functions
 * @param {*} newState desired view state
 */
function goState(newState) {
    switch (curState) {
    case DRAW_POLY_STATE:
        Object(__WEBPACK_IMPORTED_MODULE_0__polydraw__["b" /* exitPolyDrawState */])();
        break;
    case SETUP_SCALE_STATE:
        Object(__WEBPACK_IMPORTED_MODULE_1__scalesetup__["b" /* exitScaleSetupState */])();
        break;
    default:
    }
    curState = newState;
    switch (newState) {
    case DRAW_POLY_STATE:
        Object(__WEBPACK_IMPORTED_MODULE_0__polydraw__["a" /* enterPolyDrawState */])();
        break;
    case SETUP_SCALE_STATE:
        Object(__WEBPACK_IMPORTED_MODULE_1__scalesetup__["a" /* enterScaleSetupState */])();
        break;
    case NONE_STATE:
        enterDefaultState();
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
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__polydraw__["d" /* polyFinished */])()) {
        return;
    }
    const scale = Object(__WEBPACK_IMPORTED_MODULE_1__scalesetup__["c" /* getScale */])();
    // area grows quadratically
    const area = Object(__WEBPACK_IMPORTED_MODULE_3__geom__["a" /* getArea */])(Object(__WEBPACK_IMPORTED_MODULE_0__polydraw__["c" /* getPoly */])()) * scale * scale;
    document.getElementById('area').innerText = area.toFixed(3).toString();
};

// setting up backplate stuff
Object(__WEBPACK_IMPORTED_MODULE_2__backplate__["b" /* setupBackplateHandlers */])();
goState(NONE_STATE);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = enterPolyDrawState;
/* harmony export (immutable) */ __webpack_exports__["b"] = exitPolyDrawState;
/* harmony export (immutable) */ __webpack_exports__["d"] = polyFinished;
/* harmony export (immutable) */ __webpack_exports__["c"] = getPoly;
/* unused harmony export resetPoly */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draw__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(1);



const canvas = document.getElementById('pcanvas');
const ctx = canvas.getContext('2d');
let poly = [];
let isPolyFinished = false;
let curX = -1;
let curY = -1;

function enterPolyDrawState() {
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    document.getElementById('finish-path').onclick = onStopPath;
    document.getElementById('reset-path').onclick = resetPoly;
    document.getElementById('draw-path').className += ' active';
    redraw();
}

function exitPolyDrawState() {
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('mousemove', onMouseMove);

    const btn = document.getElementById('draw-path');
    btn.className = btn.className.replace(' active', '');
}

function polyFinished() {
    return isPolyFinished;
}

function getPoly() {
    return poly;
}

function resetPoly() {
    poly = [];
    isPolyFinished = false;
    curX = -1;
    curY = -1;
    redraw();
}


function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Object(__WEBPACK_IMPORTED_MODULE_0__draw__["a" /* drawBase */])(canvas);
    poly.map(function(p, i) {
        Object(__WEBPACK_IMPORTED_MODULE_0__draw__["c" /* drawPoint */])(ctx, p[0], p[1], 1.2, 'black');
        if (i + 1 < poly.length) {
            Object(__WEBPACK_IMPORTED_MODULE_0__draw__["b" /* drawLine */])(ctx, p[0], p[1], poly[i+1][0], poly[i+1][1], 2);
        }
    });

    if (curX >= 0 && curY >= 0 && poly.length > 0 && !isPolyFinished) {
        const last = poly[poly.length - 1];
        Object(__WEBPACK_IMPORTED_MODULE_0__draw__["b" /* drawLine */])(ctx, last[0], last[1], curX, curY, 2);
    }
}

function onStopPath() {
    if (poly.length < 3) {
        alert('Not enough vertices');
        return;
    }

    isPolyFinished = true;
    poly.push([poly[0][0], poly[0][1]]);

    redraw();
}

function onMouseDown(e) {
    if (e.buttons != 1) {
        return;
    }
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;

    if (e.buttons == 1 && !isPolyFinished) {
        poly.push([x, y]);
    }

    redraw();
}

function onMouseMove(e) {
    curX = e.pageX - canvas.offsetLeft;
    curY = e.pageY - canvas.offsetTop;

    if (poly.length <= 0 || isPolyFinished || e.buttons != 1) {
        return;
    }

    const last = poly[poly.length - 1];
    const vA = new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](curX, curY);
    const vB = new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](last[0], last[1]);

    if (vA.subtract(vB).length() >= 10) {
        poly.push([curX, curY]);
    }


    redraw();
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = enterScaleSetupState;
/* harmony export (immutable) */ __webpack_exports__["b"] = exitScaleSetupState;
/* harmony export (immutable) */ __webpack_exports__["c"] = getScale;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draw__ = __webpack_require__(0);



const canvas = document.getElementById('pcanvas');
const ctx = canvas.getContext('2d');

let scale = 1;
let sampleSize = '';
let from = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](-1, -1);
let to = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](-1, -1);
let curX = -1;
let curY = -1;

function redraw() {
    calcScaleFactor();
    document.getElementById('scale-factor').innerText = scale.toFixed(3).toString();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const shift = 20;
    Object(__WEBPACK_IMPORTED_MODULE_1__draw__["d" /* drawRuler */])(canvas, [shift, shift*2], [shift, canvas.height - shift], 10, 25);
    Object(__WEBPACK_IMPORTED_MODULE_1__draw__["d" /* drawRuler */])(canvas, [shift*2, shift], [canvas.width - shift, shift], 10, 25);

    let pTo = to;
    if (to.x < 0) {
        pTo = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](curX, curY);
    }

    Object(__WEBPACK_IMPORTED_MODULE_1__draw__["c" /* drawPoint */])(ctx, from.x, from.y, 2, 'red');
    Object(__WEBPACK_IMPORTED_MODULE_1__draw__["c" /* drawPoint */])(ctx, pTo.x, pTo.y, 2, 'red');

    if (pTo.x < 0 || from.x < 0) {
        return;
    }

    Object(__WEBPACK_IMPORTED_MODULE_1__draw__["b" /* drawLine */])(ctx, from.x, from.y, pTo.x, pTo.y, 1);

    // draw ticks
    const sz = 20;
    const tick = pTo.clone()
        .subtract(from).normalize().multiply(sz).rotate(Math.PI/2);

    let tStart = tick.clone().negative().multiply(0.5).add(from);
    Object(__WEBPACK_IMPORTED_MODULE_1__draw__["b" /* drawLine */])(ctx, tStart.x, tStart.y, tStart.x+tick.x, tStart.y+tick.y, 1);
    tStart = tick.clone().negative().multiply(0.5).add(pTo);
    Object(__WEBPACK_IMPORTED_MODULE_1__draw__["b" /* drawLine */])(ctx, tStart.x, tStart.y, tStart.x+tick.x, tStart.y+tick.y, 1);

    ctx.save();
    ctx.font = '15px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    const mid = from.clone()
        .add(pTo).multiply(0.5).add(tick);
    ctx.fillText(
        sampleSize,
        mid.x, mid.y
    );
    ctx.restore();
}

function enterScaleSetupState() {
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);

    const eSampleSize = document.getElementById('sample-size');
    eSampleSize.onchange = function() {
        sampleSize = eSampleSize.value;
        calcScaleFactor();
        redraw();
    };

    document.getElementById('reset-scale').onclick = function() {
        scale = 1;
        sampleSize = '';
        curX = -1;
        curY = -1;
        from.x = -1;
        from.y = -1;
        to.x = -1;
        to.y = -1;
        const eSampleSize = document.getElementById('sample-size');
        eSampleSize.value = '';
        redraw();
    };

    document.getElementById('setup-scale').className += ' active';

    redraw();
}

function exitScaleSetupState() {
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('mousemove', onMouseMove);

    const btn = document.getElementById('setup-scale');
    btn.className = btn.className.replace(' active', '');
}

function getScale() {
    return scale;
}

function calcScaleFactor() {
    if (!sampleSize || to.x < 0 || from.x < 0) {
        scale = 1;
        return;
    }

    const theirSize = parseFloat(sampleSize);
    const ourSize = to.clone().subtract(from).length();
    scale = theirSize / ourSize;
}

function onMouseDown(e) {
    if (e.buttons != 1) {
        return;
    }
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;

    if (from.x < 0) {
        from.x = x;
        from.y = y;
    } else if (to.x < 0) {
        to.x = x;
        to.y = y;
    }

    redraw();
}

function onMouseMove(e) {
    curX = e.pageX - canvas.offsetLeft;
    curY = e.pageY - canvas.offsetTop;
    redraw();
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setBackplate;
/* harmony export (immutable) */ __webpack_exports__["b"] = setupBackplateHandlers;
const canvas = document.getElementById('back-canvas');
const ctx = canvas.getContext('2d');

let backPosX = 0;
let backPosY = 0;
let backSizeP = 100;

/**
 * Sets up main canvas background
 */
function setBackplate() {
    let inp = document.getElementById('backplate');
    backPosX = 0;
    backPosY = 0;
    backSizeP = 100;

    if (inp.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function() {
            let img = new Image();
            img.onload=function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                let scaleFact = 1;
                if (img.naturalHeight > canvas.height) {
                    scaleFact = canvas.height / img.naturalHeight;
                }
                scaleFact = scaleFact.toFixed(2);
                console.log(scaleFact);
                backSizeP = Math.round(scaleFact * 100);
                ctx.drawImage(
                    img, backPosX, backPosY,
                    img.naturalWidth*scaleFact, img.naturalHeight*scaleFact
                );
                const drawCanvas = document.getElementById('pcanvas');
                drawCanvas.style.background = 'url(\''+canvas.toDataURL()+'\')';
                document.getElementById('inpScale').value = backSizeP;
                adjustBackplateSizeAndPos();
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(inp.files[0]);
    }
}

/**
 * Sets up background position and scale
 */
function adjustBackplateSizeAndPos() {
    const drawCanvas = document.getElementById('pcanvas');
    drawCanvas.style.backgroundRepeat = 'no-repeat';
    drawCanvas.style.backgroundPositionX = backPosX.toString() + 'px';
    drawCanvas.style.backgroundPositionY = backPosY.toString() + 'px';
    drawCanvas.style.backgroundSize = parseInt(backSizeP, 10).toString() + '%';
    drawCanvas.style.opacity = '0.75';
}

function setupBackplateHandlers() {
    const posXElement = document.getElementById('posX');
    posXElement.onchange = function() {
        backPosX = parseInt(posXElement.value, 10);
        adjustBackplateSizeAndPos();
    };

    const posYElement = document.getElementById('posY');
    posYElement.onchange = function() {
        backPosY = parseInt(posYElement.value, 10);
        adjustBackplateSizeAndPos();
    };

    const scaleElement = document.getElementById('inpScale');
    scaleElement.onchange = function() {
        backSizeP = parseInt(scaleElement.value, 10);
        adjustBackplateSizeAndPos();
    };
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getArea;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_earcut__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_earcut___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_earcut__);


function getArea(poly) {
    const points = [].concat(...poly);

    const ears = __WEBPACK_IMPORTED_MODULE_0_earcut___default()(points);

    let area = 0;
    for (let i = 0; i < ears.length; i += 3) {
        area += triangleArea(points, ears[i], ears[i+1], ears[i+2]);
    }

    return area;
}

function triangleArea(flatPs, idxA, idxB, idxC) {
    const ia = idxA * 2;
    const ib = idxB * 2;
    const ic = idxC * 2;

    const a = len(flatPs[ia], flatPs[ia+1], flatPs[ib], flatPs[ib+1]);
    const b = len(flatPs[ib], flatPs[ib+1], flatPs[ic], flatPs[ic+1]);
    const c = len(flatPs[ic], flatPs[ic+1], flatPs[ia], flatPs[ia+1]);

    const p = (a + b + c) / 2;

    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

function len(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = earcut;
module.exports.default = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode) return triangles;

    var minX, minY, maxX, maxY, x, y, invSize;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 1 / invSize : 0;
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertice leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(ear, triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, invSize),
        maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);

    // first look for points inside the triangle in increasing z-order
    var p = ear.nextZ;

    while (p && p.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.nextZ;
    }

    // then look for points in decreasing z-order
    p = ear.prevZ;

    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return p;
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, invSize);
                earcutLinked(c, triangles, dim, minX, minY, invSize);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m.next;

    while (p !== stop) {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if ((tan < tanMin || (tan === tanMin && p.x > m.x)) && locallyInside(p, hole)) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    }

    return m;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) * invSize;
    y = 32767 * (y - minY) * invSize;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) &&
           locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    if ((equals(p1, q1) && equals(p2, q2)) ||
        (equals(p1, q2) && equals(p2, q1))) return true;
    return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 &&
           area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertice index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};


/***/ })
/******/ ]);