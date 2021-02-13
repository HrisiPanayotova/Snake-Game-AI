const NeuronValueModule = (function () {

    function getRandomValue() {
        return Math.random() * 2 - 1;
    };
    return {
        getRandomValue
    };
})();