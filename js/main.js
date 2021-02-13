import { SnakeBrain, LayerConfig } from "./SnakeBrain.js";

// let sigmoid = (x => 1.0 / (1.0 + Math.exp(-x)));
// let activationFunction = (x) => x;
// let snake = new SnakeBrain();
// console.log(snake.getDecision([2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 1, 2, 3, 4]));

const GAME_SPEED = 5;
/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
let lastRenderTime = 0;

function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / GAME_SPEED)
        return;

    lastRenderTime = currentTime;

    update();
    draw();
}

function update() {

}

function draw() {

}

document.addEventListener("DOMContentLoaded", function () {
    window.requestAnimationFrame(main);
});