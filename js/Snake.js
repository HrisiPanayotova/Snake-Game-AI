import { Directions } from "./Directions.js";
import { SnakeBrain } from "./SnakeBrain.js";
import { getNeuronInputForPoint } from "./GeometryHelpers.js";

class Node {
    constructor(row, col, isHead) {
        this.row = row;
        this.col = col;
        this.isHead = isHead;
    }
}

export class Snake {
    /**
     * @param {SnakeBrain} snakeBrain
     */
    constructor(initRow, initCol, snakeBrain = null) {
        this.snakeBrain = snakeBrain;
        this.head = new Node(initRow, initCol, true);
        this.body = [this.head];
        this.score = 0;
        this.timeLived = 0;
        this.lastMove = null;
    }

    // getSnakeConfig() {
    //     return this.snakeBrain.values;
    // }

    update(gameState) {
        move(gameState);
        if (this.wallCollision(gameState) ||
            this.bodyCollision(gameState)) {
            //end game
        }

        if (this.appleCollision(gameState)) {
            //incr score
        }
    }

    /** @param {CanvasRenderingContext2D} ctx2d */
    draw(ctx2d) {

    }

    move(gameState) {
        if (this.snakeBrain) {
            let visionVector = this.vision(gameState);
            this.lastMove = this.snakeBrain.getDecision(visionVector);
        }
        //update body & head coords
    }

    wallCollision(gameState) {

    }

    bodyCollision(gameState) {

    }

    appleCollision(gameState) {

    }

    vision(gameState) {
        return getNeuronInputForPoint(this.head, gameState.apples, gameState.walls, gameState.bodies);
    }

    getFitness() {
        let fitness = this.timeLived + (Math.pow(2, this.score) + Math.pow(this.score, 2.1) * 500) - (Math.pow(this.score, 1.2) * Math.pow(0.25 * this.timeLived, 1.3));
        return fitness;
    }
}