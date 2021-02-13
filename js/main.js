import { SnakeBrain, LayerConfig } from "./SnakeBrain.js";
import { SnakeGame } from "./SnakeGame.js";

// let sigmoid = (x => 1.0 / (1.0 + Math.exp(-x)));
// let activationFunction = (x) => x;
// let snake = new SnakeBrain();
// console.log(snake.getDecision([2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 1, 2, 3, 4]));

const GAME_SPEED = 1;

/**@type {SnakeGame} */
let snakeGame;

function init() {
    /**@type {HTMLCanvasElement} */
    const canvas = document.getElementById("canvas");

    var rows = canvas.height;
    var cols = canvas.width;
    var snakeCoords = [{ row: rows / 2, col: cols / 2 }];
    var appleCoords = [{ row: 31, col: 12 }, { row: 16, col: 32 }, { row: 96, col: 32 }];
    snakeGame = new SnakeGame(document.getElementById("canvas"), snakeCoords, appleCoords);

    window.requestAnimationFrame(main);
}

let lastRenderTime = 0;
function main(currentTime) {
    if (snakeGame.finished()) {
        alert("Game finished!");
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / GAME_SPEED)
        return;

    lastRenderTime = currentTime;

    console.log(secondsSinceLastRender);
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