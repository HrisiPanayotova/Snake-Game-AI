function getLineByPoints(point1, point2) {
    let { col: col1, row: row1 } = point1;
    let { col: col2, row: row2 } = point2;
    let a = (row2 - row1) / (col2 - col1);
    let b = row1 - a * col1;
    return [a, b];
}

function isAboveLine(point, line) {
    let lineValue = line.a * point.col + line.b;
    return point.row > lineValue;
}

function isBelowLine(point, line) {
    let lineValue = line.a * point.col + line.b;
    return point.row < lineValue;
}

function isAtLine(point, line) {
    let lineValue = line.a * point.col + line.b;
    return point.row = lineValue;
}

const partion0Filter = (centerPoint, point) => point.col <= centerPoint.col && isAboveLine(point,
    getLineByPoints(centerPoint, { col: centerPoint.col + 1 / 2, row: centerPoint.row + 1 / 2 }));

const partion1Filter = (centerPoint, point) => {
    let line = getLineByPoints(centerPoint, { col: centerPoint.col + 1 / 2, row: centerPoint.row + 1 / 2 });
    return point.row > centerPoint.row && (isBelowLine(point, line) || isAtLine(point, line));
}

const partion2Filter = (centerPoint, point) => point.row <= centerPoint.row && isAboveLine(point,
    getLineByPoints(centerPoint, { col: centerPoint.col + 1 / 2, row: centerPoint.row - 1 / 2 }));

const partion3Filter = (centerPoint, point) => {
    let line = getLineByPoints(centerPoint, { col: centerPoint.col + 1 / 2, row: centerPoint.row - 1 / 2 });
    return point.row > centerPoint.row && (isBelowLine(point, line) || isAtLine(point, line));
}

const partion4Filter = (centerPoint, point) => point.col >= centerPoint.col && isBelowLine(point,
    getLineByPoints(centerPoint, { col: centerPoint.col - 1 / 2, row: centerPoint.row - 1 / 2 }));


const partion5Filter = (centerPoint, point) => {
    let line = getLineByPoints(centerPoint, { col: centerPoint.col - 1 / 2, row: centerPoint.row - 1 / 2 });
    return point.row < centerPoint.row && (isAboveLine(point, line) || isAtLine(point, line));
}

const partion6Filter = (centerPoint, point) => point.col >= centerPoint.col && isBelowLine(point,
    getLineByPoints(centerPoint, { col: centerPoint.col - 1 / 2, row: centerPoint.row + 1 / 2 }));

const partion7Filter = (centerPoint, point) => {
    let line = getLineByPoints(centerPoint, { col: centerPoint.col - 1 / 2, row: centerPoint.row + 1 / 2 });
    return point.col > centerPoint.col && (isAboveLine(point, line) || isAtLine(point, line));
}

const partitionFilters = [partion0Filter, partion1Filter, partion2Filter, partion3Filter, partion4Filter, partion5Filter, partion6Filter, partion6Filter, partion7Filter];

function getDistanceByPoints(point1, point2) {
    return Math.sqrt(Math.pow(point1.col - point2.col, 2) + Math.pow(point1.row - point2.row, 2));
}

function getClosestFromSet(point, filter, objects) {
    let centerObjs = objects
        .map(p => ({ row: p.row + 1 / 2, col: p.col + 1 / 2 }))
        .filter(filter);
    let mappedToDistance = centerObjs.map(elem => getDistanceByPoints(point, elem));
    return Math.min(...mappedToDistance);
}

export function getNeuronInputForPoint(point, apples, walls, bodies) {
    let bodiesWithoutCurrent = bodies.filter(elem => elem.row != point.row || elem.col != point.col);
    let centerPoint = { row: point.row + 1 / 2, col: point.col + 1 / 2 };
    let neuronInput = [];
    let objects = [apples, walls, bodiesWithoutCurrent];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < objects.length; j++) {
            neuronInput.push(getClosestFromSet(centerPoint, partitionFilters[i], objects[j]));
        }
    }
    return neuronInput;
}