import { drawGrid } from "./grid";
import { ctx, canvas } from "./canvasSetup";
import { GameState } from "./GameState.ts";

export class GameLoop {

    public gameState: GameState;

    constructor(gameState: GameState) {
        this.gameState = gameState;
        this.gameLoop = this.gameLoop.bind(this);
    }

    gameLoop() {
        if (this.gameState.player.dead) {
            this.renderDeathScreen()
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid(ctx, 50);

        this.gameState.update();

        requestAnimationFrame(this.gameLoop);
    }

    start() {
        this.gameState.player.middleX = this.gameState.level.platforms[0].middleX;
        this.gameState.player.bottom = this.gameState.level.platforms[0].y - 100;
        this.gameLoop();
    }

    renderDeathScreen() {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "100px Arial";
        ctx.fillStyle = "white";
        const text = "you died.";
        const textWidth = ctx.measureText(text).width;
        const textHeight = 100;
        console.log(textWidth, textHeight);
        const textX = canvas.width / 2 - textWidth / 2;
        const textY = canvas.height / 2 - textHeight / 2;
        ctx.fillText(text, textX, textY);
    }
}