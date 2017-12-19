import Vector from './vector';

/**
 * Draws ruler
 */
function drawRuler(canvas, from, to, tickSz, tickStep) {
    const ctx2D = canvas.getContext('2d');
    drawLine(ctx2D, from[0], from[1], to[0], to[1], 1);

    ctx2D.beginPath();
    ctx2D.font = '9px Arial';
    ctx2D.fillStyle = 'black';

    let start = new Vector(from[0], from[1]);
    const end = new Vector(to[0], to[1]);
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

export {drawRuler, drawPoint, drawLine, putAreaText};
