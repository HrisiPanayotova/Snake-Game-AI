import { SnakeBrain, LayerConfig } from "./SnakeBrain.js";
import { SnakeGame } from "./SnakeGame.js";

// let sigmoid = (x => 1.0 / (1.0 + Math.exp(-x)));
// let activationFunction = (x) => x;
// let snake = new SnakeBrain();
// console.log(snake.getDecision([2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 1, 2, 3, 4]));

const GAME_SPEED = 20;

/**@type {SnakeGame} */
let snakeGame;

function init() {
    /**@type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");

    var snakeCoords = [{ x: 200, y: 200 }];
    var appleCoords = [{ x: 120, y: 140 }, { x: 240, y: 20 }, { x: 280, y: 360 }];
    snakeGame = new SnakeGame(canvas, snakeCoords, appleCoords);

    window.requestAnimationFrame(main);
}

let lastRenderTime = 0;
function main(currentTime) {
    if (snakeGame.finished) {
        alert("Game finished!");
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / GAME_SPEED)
        return;

    lastRenderTime = currentTime;

    update();
    draw();
}

function update() {
    snakeGame.update();
}

function draw() {
    snakeGame.draw();
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});