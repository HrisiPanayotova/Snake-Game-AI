import { SnakeBrain, LayerConfig } from "./SnakeBrain.js";

let sigmoid = (x => 1.0 / (1.0 + Math.exp(-x)));
let activationFunction = (x) => x;
let snake = new SnakeBrain();
console.log(snake.getDecision([2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 1, 2, 3, 4]));