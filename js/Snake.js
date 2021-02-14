import { Directions as Directions } from "./Directions.js";
import { SnakeBrain } from "./SnakeBrain.js";
import { getNeuronInputForPoint } from "./GeometryHelpers.js";

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Snake {
    /**
     * @param {SnakeBrain} snakeBrain
     */
    constructor(initX, initY, bodySize, isHuman, snakeBrain = null) {
        this.snakeBrain = snakeBrain;
        this.bodySize = bodySize;
        this.head = new Node(initX, initY, bodySize, true);
        this.body = [this.head];
        this.score = 0;
        this.timeLived = 0;
        this.isHuman = isHuman;
        this.lastMove = null;
        this.lastInput = Directions.UP;
        this.isDead = false;

        if (this.isHuman) {
            this.subscribeKeyboardInputs();
        }
    }

    // getSnakeConfig() {
    //     return this.snakeBrain.values;
    // }

    /**
     * 
     * @param {{apples: [{x: number, y: number}],
     *          bodies: [{x: number, y: number}],
     *          canvasSize: {x: number, y: number}}} gameState 
     */
    update(gameState) {
        let newMove = this.nextMove(gameState);

        //if we need to incr snake
        let last = this.body[this.body.length - 1];
        let lastX = last.x;
        let lastY = last.y;

        this.moveSnake(newMove);

        if (this.wallCollision(gameState.canvasSize) ||
            this.bodyCollision(gameState.bodies)) {
            this.isDead = true;
            return 0;
        }

        let appleEaten = false;
        if (this.appleCollision(gameState.apples)) {
            appleEaten = true;
            gameState.apples = gameState.apples
                .filter(({ x, y }) => x !== this.head.x && y !== this.head.y);
            this.body.push(new Node(lastX, lastY, false));
        }

        this.lastMove = newMove;

        if (appleEaten) {
            return 1;
        }

        return 0;
    }

    /** @param {CanvasRenderingContext2D} ctx2d */
    draw(ctx2d) {
        ctx2d.fillStyle = 'rgb(0,200,200)';
        ctx2d.fillRect(this.head.x, this.head.y, this.bodySize, this.bodySize);
        ctx2d.strokeRect(this.head.x, this.head.y, this.bodySize, this.bodySize);

        ctx2d.fillStyle = 'rgb(0,200,0)';
        for (let i = 1; i < this.body.length; i++) {
            ctx2d.fillRect(this.body[i].x, this.body[i].y, this.bodySize, this.bodySize);
            ctx2d.strokeRect(this.body[i].x, this.body[i].y, this.bodySize, this.bodySize);
        }
    }

    nextMove(gameState) {
        let newMove = null;
        if (this.snakeBrain) {
            let visionVector = this.vision(gameState);
            newMove = this.snakeBrain.getDecision(visionVector);
        }
        else if (this.isHuman) {
            newMove = this.lastInput;
        }

        if (newMove === Directions.RIGHT && this.lastMove === Directions.LEFT ||
            newMove === Directions.LEFT && this.lastMove === Directions.RIGHT ||
            newMove === Directions.UP && this.lastMove === Directions.DOWN ||
            newMove === Directions.DOWN && this.lastMove === Directions.UP) {
            newMove = this.lastMove;
        }
        return newMove;
    }

    moveSnake(newMove) {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        switch (newMove) {
            case Directions.RIGHT:
                this.head.x += this.bodySize;
                break;
            case Directions.LEFT:
                this.head.x -= this.bodySize;
                break;
            case Directions.UP:
                this.head.y -= this.bodySize;
                break;
            case Directions.DOWN:
                this.head.y += this.bodySize;
                break;
        }
    }

    /** @param {{x: number, y: number}} canvasSize */
    wallCollision(canvasSize) {

        return this.head.x < 0 ||
            this.head.y < 0 ||
            this.head.x > canvasSize.x ||
            this.head.y > canvasSize.y;
    }

    bodyCollision(gameState) {
        return false;
    }

    /** @param {[{x: number, y: number}]} apples */
    appleCollision(apples) {
        return apples.some(({ x, y }) => this.head.x === x && this.head.y === y);
    }

    vision(gameState) {
        let walls = [];
        for (let i = 0; i < gameState.canvasSize; i++) {
            walls.push({ x: 0, y: i });
            walls.push({ x: i, y: 0 });
            walls.push({ x: i, y: gameState.canvasSize - 1 });
            walls.push({ x: gameState.canvasSize - 1, y: i });
        }
        let visionInput = getNeuronInputForPoint(this.head, gameState.apples, walls, gameState.bodies);
        let lastMoveIndex = Object.values(Directions).findIndex(elem => elem == this.lastMove);
        let lastMoveNeurons = [-1, -1, -1, -1];
        if (lastMoveIndex || lastMoveIndex == 0) lastMoveNeurons[lastMoveIndex] = 1;
        return [...visionInput, ...lastMoveNeurons];
    }

    getFitness() {
        let fitness = this.timeLived + (Math.pow(2, this.score) + Math.pow(this.score, 2.1) * 500) - (Math.pow(this.score, 1.2) * Math.pow(0.25 * this.timeLived, 1.3));
        return fitness;
    }

    subscribeKeyboardInputs() {
        document.addEventListener("keydown", evt => {
            switch (evt.code) {
                case "ArrowUp":
                    this.lastInput = Directions.UP;
                    break;
                case "ArrowDown":
                    this.lastInput = Directions.DOWN;
                    break;
                case "ArrowLeft":
                    this.lastInput = Directions.LEFT;
                    break;
                case "ArrowRight":
                    this.lastInput = Directions.RIGHT;
                    break;
            }
        });
    }
}