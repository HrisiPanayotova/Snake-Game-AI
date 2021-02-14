import { Snake } from "./Snake.js";
import { GAME_OBJ_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH } from "./Settings.js";
import { flatMap } from "./Helpers.js";

export class SnakeGame {
    /**
     * @param {[{x: number, y: number}]} snakeCoordinates
     * @param {[{x: number, y: number}]} appleCoordinates
     * @param {CanvasRenderingContext2D} ctx
    */
    constructor(ctx, snakes, appleCoordinates) {
        this.gameState = {
            apples: [...appleCoordinates],
            bodies: [],
        };

        this.snakes = [...snakes];
        // for (let { x, y } of snakeCoordinates) {
        //     this.snakes.push(new Snake(x, y, true));
        // }
        this.gameState.bodies = flatMap((snake) => snake.body, this.snakes);

        this.finished = false;
        this.ctx = ctx;
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

            this.gameState.bodies = flatMap((snake) => snake.body, this.snakes.filter(sn => !sn.isDead));
        }
    }

    draw() {
        // clear
        this.ctx.fillStyle = '#232323';
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        //draw apples
        this.ctx.fillStyle = 'rgb(200,0,0)';
        for (let { x, y } of this.gameState.apples) {
            this.ctx.fillRect(x, y, GAME_OBJ_SIZE, GAME_OBJ_SIZE);
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
        let appleX = Math.floor(Math.random() * (CANVAS_WIDTH / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE;
        let appleY = Math.floor(Math.random() * (CANVAS_HEIGHT / GAME_OBJ_SIZE)) * GAME_OBJ_SIZE;
        let apple = { x: appleX, y: appleY };
        this.gameState.apples.push(apple);
    }
}