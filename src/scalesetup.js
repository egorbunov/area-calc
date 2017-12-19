import Vector from './vector';
import {drawRuler, drawPoint, drawLine} from './draw';

const canvas = document.getElementById('pcanvas');
const ctx = canvas.getContext('2d');

let scale = 1;
let sampleSize = '';
let from = new Vector(-1, -1);
let to = new Vector(-1, -1);
let curX = -1;
let curY = -1;

function redraw() {
    calcScaleFactor();
    document.getElementById('scale-factor').innerText = scale.toString();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const shift = 20;
    drawRuler(canvas, [shift, shift*2], [shift, canvas.height - shift], 10, 25);
    drawRuler(canvas, [shift*2, shift], [canvas.width - shift, shift], 10, 25);

    let pTo = to;
    if (to.x < 0) {
        pTo = new Vector(curX, curY);
    }

    drawPoint(ctx, from.x, from.y, 2, 'red');
    drawPoint(ctx, pTo.x, pTo.y, 2, 'red');

    if (pTo.x < 0 || from.x < 0) {
        return;
    }

    drawLine(ctx, from.x, from.y, pTo.x, pTo.y, 1);

    // draw ticks
    const sz = 20;
    const tick = pTo.clone()
        .subtract(from).normalize().multiply(sz).rotate(Math.PI/2);

    let tStart = tick.clone().negative().multiply(0.5).add(from);
    drawLine(ctx, tStart.x, tStart.y, tStart.x+tick.x, tStart.y+tick.y, 1);
    tStart = tick.clone().negative().multiply(0.5).add(pTo);
    drawLine(ctx, tStart.x, tStart.y, tStart.x+tick.x, tStart.y+tick.y, 1);

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

export function enterScaleSetupState() {
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


    redraw();
}

export function exitScaleSetupState() {
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('mousemove', onMouseMove);
}

export function getScale() {
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
