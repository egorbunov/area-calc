import {drawBase, drawPoint, drawLine} from './draw';
import Vector from './vector';

const canvas = document.getElementById('pcanvas');
const ctx = canvas.getContext('2d');
let poly = [];
let isPolyFinished = false;
let curX = -1;
let curY = -1;

export function enterPolyDrawState() {
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    document.getElementById('finish-path').onclick = onStopPath;
    document.getElementById('reset-path').onclick = resetPoly;
    document.getElementById('draw-path').className += ' active';
    redraw();
}

export function exitPolyDrawState() {
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('mousemove', onMouseMove);

    const btn = document.getElementById('draw-path');
    btn.className = btn.className.replace(' active', '');
}

export function polyFinished() {
    return isPolyFinished;
}

export function getPoly() {
    return poly;
}

export function resetPoly() {
    poly = [];
    isPolyFinished = false;
    curX = -1;
    curY = -1;
    redraw();
}


function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase(canvas);
    poly.map(function(p, i) {
        drawPoint(ctx, p[0], p[1], 1.2, 'black');
        if (i + 1 < poly.length) {
            drawLine(ctx, p[0], p[1], poly[i+1][0], poly[i+1][1], 2);
        }
    });

    if (curX >= 0 && curY >= 0 && poly.length > 0 && !isPolyFinished) {
        const last = poly[poly.length - 1];
        drawLine(ctx, last[0], last[1], curX, curY, 2);
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
    const vA = new Vector(curX, curY);
    const vB = new Vector(last[0], last[1]);

    if (vA.subtract(vB).length() >= 10) {
        poly.push([curX, curY]);
    }


    redraw();
}
