let sigmoid = (x => 1.0 / (1.0 + Math.exp(-x)));
let activationFunction = (x) => x;
let snakeBrain = new SnakeBrainModule.SnakeBrain();
console.log(snakeBrain.getDecision([2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 1, 2, 3, 4]));

let snake = new SnakeModule.Snake();
console.log(snake.snakeBrain.getDecision([2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 2, 5, 5, 6, 7, 1, 2, 3, 4]));
console.log(snake.score);

let population = new PopulationModule.Population();
population.trainUntilPopulation(2);