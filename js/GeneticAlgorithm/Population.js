import { SnakeBrain } from "../SnakeBrain.js";
import { mutation } from "./Mutation.js";
import { selection } from "./Selection.js";
import { crossover } from "./Crossover.js";

const POPULATION_COUNT = 20;
const SNAKES_PER_POPULATION = 5;
const MUTATION_NEURON_RATE = 0.10;
const BEST_SNAKE_PERCENT = 50;
const MUTATION_PERCENT = 0.50;
const OLD_PERCENT = 0.10;


export class Population {

    constructor(selectionF = selection, mutationF = mutation, crossoverF = crossover) {
        this.selection = selectionF;
        this.mutation = mutationF;
        this.crossover = crossoverF;
        this.initPopulation();
        this.populationNumber = 0;
    }

    initPopulation() {
        this.population = [];
        for (let i = 0; i < POPULATION_COUNT; i++) {
            let singlePopulation = [];
            for (let j = 0; j < SNAKES_PER_POPULATION; j++) {
                singlePopulation.push(new SnakeBrain());
            }
            this.population.push(singlePopulation);
        }
    }

    generateNextPopulation() {
        console.log(`Evaluation of population - ${this.populationNumber}`);
        //play game for each group of snakes for current population and evaluate score and timelived for each snake
        let snakes = [].concat(...this.population);
        snakes = snakes.sort((snake1, snake2) => snake1.getFitness() < snake2.getFitness());
        let lastSnake = Math.floor((BEST_SNAKE_PERCENT / 100) * snakes.length);
        let oldSnakes = snakes.slice(0, Math.floor(OLD_PERCENT * snakes.length));
        let newPopulation = [];
        let populationCount = newPopulation.length;
        while (populationCount < POPULATION_COUNT) {
            let snakeCount = 0;
            let snakeGroup = [];
            while (snakeCount < SNAKES_PER_POPULATION) {
                if (oldSnakes.length) {
                    snakeGroup.push(oldSnakes.pop());
                    snakeCount++;
                    continue;
                }
                let [parent1, parent2] = this.selection(snakes, lastSnake);
                let children = this.crossover(parent1, parent2);
                let childIndex = Math.floor(Math.random() * 2);
                if (Math.random < MUTATION_PERCENT) {
                    this.mutation(children[childIndex], MUTATION_NEURON_RATE);
                };
                snakeGroup.push(children[childIndex]);
                snakeCount++;
            }
            newPopulation.push(snakeGroup);
            populationCount++;
        }
        this.populationNumber++;
        this.population = newPopulation;
    }

    trainUntilPopulation(targetPopulation) {
        while (this.populationNumber < targetPopulation) {
            this.generateNextPopulation();
        }
        //playGame for the first group of snakes in the current population
    }
}