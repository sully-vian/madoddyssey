import { GameLoop } from "./gameLoop";
import { GameState } from "./gameState";
import "./input";

export const gameState = new GameState();
export const gameLoop = new GameLoop(gameState);

gameLoop.start();

window.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        window.location.reload();
    }
});