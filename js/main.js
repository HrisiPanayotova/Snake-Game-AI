import { SnakeBrain, LayerConfig } from "./SnakeBrain.js";
import { SnakeGame } from "./SnakeGame.js";
import { GAME_SPEED, CANVAS_WIDTH, CANVAS_HEIGHT, APPLE_CNT, GAME_OBJ_SIZE } from "./Settings.js";
import { Population } from "./GeneticAlgorithm/Population.js";
import { Snake } from "./Snake.js";

// let sigmoid = (x => 1.0 / (1.0 + Math.exp(-x)));
// let activationFunction = (x) => x;
// let snake = new SnakeBrain();
// console.log(snake.getDecision([2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 1, 2, 3, 4]));

/**@type {Population} */
let population;
let snakeGame;
let canvases = [];
/**@type {SnakeGame[]} */
let games = [];

function init() {
    population = new Population();

    for (let i = 0; i < 10; i++) {
        canvases[i] = document.getElementById("canvas" + i);
        canvases[i].width = CANVAS_WIDTH;
        canvases[i].height = CANVAS_HEIGHT;

        let curGame = population.population[i];
        let snakes = curGame.map(brain =>
            new Snake(Math.floor(Math.random() * (CANVAS_WIDTH / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE, Math.floor(Math.random() * (CANVAS_HEIGHT / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE,
                false, brain))

        let apples = [];
        for (let i = 0; i < APPLE_CNT; i++) {
            let appleX = Math.floor(Math.random() * (CANVAS_WIDTH / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE;
            let appleY = Math.floor(Math.random() * (CANVAS_HEIGHT / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE;
            apples.push({ x: appleX, y: appleY });
        }
        let game = new SnakeGame(canvases[i].getContext("2d"), snakes, apples);
        games.push(game);
    }
    window.requestAnimationFrame(main);

    // /**@type {HTMLCanvasElement} */


    // var snakeCoords = [{ x: 200, y: 200 }];
    // var appleCoords = [{ x: 120, y: 140 }, { x: 240, y: 20 }, { x: 280, y: 360 }];
    // snakeGame = new SnakeGame(canvas.getContext("2d"), snakeCoords, appleCoords);

}

function nextGames(population) {
    games = [];
    for (let i = 0; i < 10; i++) {
        let curBrains = population.population[i];
        let snakes = curBrains.map(brain =>
            new Snake(Math.floor(Math.random() * (CANVAS_WIDTH / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE, Math.floor(Math.random() * (CANVAS_HEIGHT / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE,
                false, brain))

        let apples = [];
        for (let i = 0; i < APPLE_CNT; i++) {
            let appleX = Math.floor(Math.random() * (CANVAS_WIDTH / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE;
            let appleY = Math.floor(Math.random() * (CANVAS_HEIGHT / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE;
            apples.push({ x: appleX, y: appleY });
        }
        let game = new SnakeGame(canvases[i].getContext("2d"), snakes, apples);
        games.push(game);
    }
    window.requestAnimationFrame(main);
}

let lastRenderTime = 0;
function main(currentTime) {
    if (games.every(g => g.finished)) {
        population.generateNextPopulation();
        nextGames(population);
        console.log(population.populationNumber);
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
    for (let game of games) {
        game.update();
    }
}

function draw() {
    for (let game of games) {
        game.draw();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});