export class SnakeGame {
    constructor(canvas, snakeCoordinates, appleCoordinates) {
        this.canvas = canvas;
        /**@type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");

        this.snakes = [];
        this.apples = [];
    }

    update() {

    }

    draw() {
        // // clear
        // this.ctx.fillStyle = '#232323'
        // this.ctx.fillRect(0, 0, canvas.width, canvas.height)

        // // draw snake
        // this.ctx.fillStyle = 'rgb(0,200,50)'
        // //state.snake.map(p => this.ctx.fillRect(x(p.x), y(p.y), x(1), y(1)))

        // // draw apples
        // this.ctx.fillStyle = 'rgb(255,50,0)'
        // this.ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1))

        // // add crash
        // if (state.snake.length == 0) {
        //     this.ctx.fillStyle = 'rgb(255,0,0)'
        //     this.ctx.fillRect(0, 0, canvas.width, canvas.height)
        // }
    }
}