import { GameLoop } from "./GameLoop.js";
import { GameState } from "./GameState.js";
import "./input.js";
export const gameState = new GameState();
export const gameLoop = new GameLoop(gameState);
gameLoop.start();
window.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        window.location.reload();
    }
});
