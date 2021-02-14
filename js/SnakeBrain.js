import { Directions } from "./Directions.js";
import { getRandomValue } from "./NeuronValue.js";

export class LayerConfig {
    constructor(neuronsCount) {
        this.neuronsCount = neuronsCount;
    }
}

const DEFAULT_ACTIVATION_FUNCTION = (x => 1.0 / (1.0 + Math.exp(-x)));
const INPUT_NEURON_COUNT = 28;
const HIDDEN_LAYER_CONFIG = [new LayerConfig(16), new LayerConfig(16)];


export class SnakeBrain {

    constructor(
        weightsConfig = undefined,
        activationFunction = DEFAULT_ACTIVATION_FUNCTION,
        inputNeuronsCount = INPUT_NEURON_COUNT,
        hiddenLayersConfig = HIDDEN_LAYER_CONFIG,
    ) {
        this.activationFunction = activationFunction;
        this.layerConfig = [new LayerConfig(inputNeuronsCount), ...hiddenLayersConfig, new LayerConfig(4)];
        this.outputLayerValues = Object.values(Directions);
        if (!weightsConfig) {
            this.initRandomState();
        } else {
            this.values = weightsConfig;
        }
        // this.score = Math.floor(Math.random() * 15);
        // this.timeLived = Math.floor(Math.random() * 50);
        this.score = 0;
        this.timeLived = 0;
    }

    updateScore() {
        this.score++;
    }

    getSnakeConfig() {
        return this.values;
    }

    updateTimeLived() {
        this.timeLived++;
    }

    getFitness() {
        let fitness = this.timeLived + (Math.pow(2, this.score) + Math.pow(this.score, 2.1) * 500) - (Math.pow(this.score, 1.2) * Math.pow(0.25 * this.timeLived, 1.3));
        return fitness;
    }


    initRandomState() {
        this.values = [];
        let prevNeuronCount = this.layerConfig[0].neuronsCount;
        for (let layerIndex = 1; layerIndex < this.layerConfig.length; layerIndex++) {
            let neuronsCount = this.layerConfig[layerIndex].neuronsCount;
            let neuronConfig = [];
            for (let i = 0; i < neuronsCount; i++) {
                let curNeuronValues = { weights: [], bias: getRandomValue() };
                for (let j = 0; j < prevNeuronCount; j++) {
                    curNeuronValues.weights.push(getRandomValue());
                }
                neuronConfig.push(curNeuronValues);
            }
            this.values.push(neuronConfig);
            prevNeuronCount = this.layerConfig[layerIndex].neuronsCount;
        }
    }

    getDecision(input) {
        for (let value of this.values) {
            let newInput = [];
            for (let neuronVals of value) {
                let resultVal = -1 * neuronVals.bias;
                for (let i = 0; i < neuronVals.weights; i++) {
                    resultVal += input[i] * neuronVals.weights[i];
                }
                resultVal = this.activationFunction(resultVal);
                newInput.push(resultVal);
            }
            input = newInput;
        }
        let decisionIndex = input.indexOf(Math.max(...input));
        return this.outputLayerValues[decisionIndex];
    }
}