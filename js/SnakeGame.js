import { Snake } from "./Snake.js";

export class SnakeGame {
    /**
     * @param {[{x: number, y: number}]} snakeCoordinates
     * @param {[{x: number, y: number}]} appleCoordinates
     * @param {HTMLCanvasElement} canvas
    */
    constructor(canvas, snakeCoordinates, appleCoordinates) {
        this.canvas = canvas;
        /**@type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");

        this.gameState = {
            apples: appleCoordinates,
            bodies: [],
            canvasSize: { x: this.canvas.width, y: this.canvas.height },
        };

        this.snakes = [];
        for (let arr of snakeCoordinates) {
            this.snakes.push(new Snake(arr.x, arr.y, 20, true));
        }
        this.finished = false;
    }

    update() {
        if (this.snakes.every(snake => snake.isDead)) {
            this.finished = true;
            return;
        }

        for (let snake of this.snakes) {
            if (snake.isDead) {
                continue;
            }

            let res = snake.update(this.gameState);

            //apple eaten - respawn apple
            if (res === 1) {
                this.spawnNewApple();
            }

        }
    }

    draw() {
        // clear
        this.ctx.fillStyle = '#232323'
        this.ctx.fillRect(0, 0, canvas.width, canvas.height)

        //draw apples
        this.ctx.fillStyle = 'rgb(200,0,0)';
        for (let { x, y } of this.gameState.apples) {
            this.ctx.fillRect(x, y, 20, 20);
        }

        //draw snakes
        for (let snake of this.snakes) {
            if (snake.isDead) {
                continue;
            }
            snake.draw(this.ctx);
        }
    }

    spawnNewApple() {

    }
}