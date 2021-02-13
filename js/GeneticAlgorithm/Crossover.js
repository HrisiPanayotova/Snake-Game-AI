import { Snake } from "../Snake.js";

export function crossover(parent1, parent2) {
    let config1 = parent1.getSnakeConfig();
    let config2 = parent2.getSnakeConfig();
    let layerSplit = Math.floor(Math.random() * config1.length);
    let neuronSplit = Math.floor(Math.random() * config1[0].length);

    let firstChildConf = createChild(config1, config2, layerSplit, neuronSplit);
    let secondChildConf = createChild(config2, config1, layerSplit, neuronSplit);

    return [new Snake(firstChildConf), new Snake(secondChildConf)];
}

function createChild(conf1, conf2, layerIndex, neuronIndex) {
    let firstPart = conf1.slice(0, layerIndex);
    let secondPart = conf2.slice(layerIndex + 1);
    let neuronPart1 = conf1[layerIndex].slice(0, neuronIndex);
    let neuronPart2 = conf2[layerIndex].slice(neuronIndex);
    return [...firstPart, [...neuronPart1, ...neuronPart2], ...secondPart];
}