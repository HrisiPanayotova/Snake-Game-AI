import { GAME_OBJ_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from "./Settings.js";

const walls = [];
for (let i = 0; i < CANVAS_WIDTH / GAME_OBJ_SIZE; i++) {
    walls.push({ x: i, y: 0 });
    walls.push({ x: i, y: CANVAS_HEIGHT / GAME_OBJ_SIZE - 1 });
}

for (let i = 0; i < CANVAS_HEIGHT / GAME_OBJ_SIZE; i++) {
    walls.push({ x: 0, y: i });
    walls.push({ x: CANVAS_WIDTH / GAME_OBJ_SIZE, y: i });
}

function getLineByPoints(point1, point2) {
    let { x: x1, y: y1 } = point1;
    let { x: x2, y: y2 } = point2;
    let a = (y2 - y1) / (x2 - x1);
    let b = y1 - a * x1;
    return { a, b };
}

function isAboveLine(point, line) {
    let lineValue = line.a * point.x + line.b;
    return point.y < lineValue;
}

function isBelowLine(point, line) {
    let lineValue = line.a * point.x + line.b;
    return point.y > lineValue;
}

function isAtLine(point, line) {
    let lineValue = line.a * point.x + line.b;
    return point.y == lineValue;
}

export const partion0Filter = (centerPoint, point) => {
    return point.x >= centerPoint.x && isAboveLine(point,
        getLineByPoints(centerPoint, { x: centerPoint.x + 1 / 2, y: centerPoint.y - 1 / 2 }))
};

export const partion1Filter = (centerPoint, point) => {
    let line = getLineByPoints(centerPoint, { x: centerPoint.x + 1 / 2, y: centerPoint.y - 1 / 2 });
    return point.y < centerPoint.y && (isBelowLine(point, line) || isAtLine(point, line));
}

export const partion2Filter = (centerPoint, point) => point.y >= centerPoint.y && isAboveLine(point,
    getLineByPoints(centerPoint, { x: centerPoint.x + 1 / 2, y: centerPoint.y + 1 / 2 }));

export const partion3Filter = (centerPoint, point) => {
    let line = getLineByPoints(centerPoint, { x: centerPoint.x + 1 / 2, y: centerPoint.y + 1 / 2 });
    return point.x > centerPoint.x && (isBelowLine(point, line) || isAtLine(point, line));
}

export const partion4Filter = (centerPoint, point) => point.x <= centerPoint.x && isBelowLine(point,
    getLineByPoints(centerPoint, { x: centerPoint.x - 1 / 2, y: centerPoint.y + 1 / 2 }));


export const partion5Filter = (centerPoint, point) => {
    let line = getLineByPoints(centerPoint, { x: centerPoint.x - 1 / 2, y: centerPoint.y + 1 / 2 });
    return point.y > centerPoint.y && (isAboveLine(point, line) || isAtLine(point, line));
}

export const partion6Filter = (centerPoint, point) => point.y <= centerPoint.y && isBelowLine(point,
    getLineByPoints(centerPoint, { x: centerPoint.x - 1 / 2, y: centerPoint.y - 1 / 2 }));

export const partion7Filter = (centerPoint, point) => {
    let line = getLineByPoints(centerPoint, { x: centerPoint.x - 1 / 2, y: centerPoint.y - 1 / 2 });
    return point.x < centerPoint.x && (isAboveLine(point, line) || isAtLine(point, line));
}

const partitionFilters = [partion0Filter, partion1Filter, partion2Filter, partion3Filter, partion4Filter, partion5Filter, partion6Filter, partion7Filter];

function getDistanceByPoints(point1, point2) {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
}

function getClosestFromSet(point, filter, objects) {
    let centerObjs = objects
        .map(p => ({ y: p.y + 1 / 2, x: p.x + 1 / 2 }))
        .filter(p => filter(point, p));
    let mappedToDistance = centerObjs.map(elem => getDistanceByPoints(point, elem));
    return mappedToDistance.length ? Math.min(...mappedToDistance) : -1;
}

export function getNeuronInputForPoint(point, apples, bodies) {
    let bodiesWithoutCurrent = bodies.filter(elem => elem.y != point.y || elem.x != point.x);
    let centerPoint = { y: point.y / GAME_OBJ_SIZE + 1 / 2, x: point.x / GAME_OBJ_SIZE + 1 / 2 };
    let neuronInput = [];
    let objects = [apples, walls, bodiesWithoutCurrent];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < objects.length; j++) {
            let objs = objects[j].map(elem => ({ x: elem.x / GAME_OBJ_SIZE, y: elem.y / GAME_OBJ_SIZE }));
            neuronInput.push(getClosestFromSet(centerPoint, partitionFilters[i], objs));
        }
    }
    return neuronInput;
}