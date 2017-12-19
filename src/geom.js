import earcut from 'earcut';

export function getArea(poly) {
    const points = [].concat(...poly);

    const ears = earcut(points);

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
