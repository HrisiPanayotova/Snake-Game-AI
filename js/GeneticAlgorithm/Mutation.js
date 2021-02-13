//uniform mutation
function mutation(snake, mutationRate) {
    let config = snake.getSnakeConfig();
    for (let layer of config) {
        for (let neuron of layer) {
            if (Math.random() < mutationRate) neuron.bias = NeuronValueModule.getRandomValue();
            neuron.weights.forEach((_, i) => {
                if (Math.random() < mutmutationRateationPercent) neuron.weights[i] = NeuronValueModule.getRandomValue();
            });
        }
    }
}