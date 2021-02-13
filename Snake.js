const SnakeModule = (function () {

    class Snake {
        constructor(config = undefined) {
            this.snakeBrain = new SnakeBrainModule.SnakeBrain(config);
            this.score = 0;
            this.timeLived = 0;
        }

        setScore(score) {
            this.score = score;
        }

        setTimeLived(timeLived) {
            this.timeLived = timeLived;
        }

        getSnakeConfig() {
            return this.snakeBrain.values;
        }

        getFitness() {
            let fitness = this.timeLived + (Math.pow(2, this.score) + Math.pow(this.score, 2.1) * 500) - (Math.pow(this.score, 1.2) * Math.pow(0.25 * this.timeLived, 1.3));
            return fitness;
        }
    }

    return {
        Snake
    }

}());