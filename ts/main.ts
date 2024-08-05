import { GameLoop } from "./GameLoop.js";
import { GameState } from "./GameState.js";
import "./input.js";

console.log(window.location.pathname);
export const basePath = window.location.pathname.includes("/madoddyssey/") ? "/madoddyssey/" : "/";

export const gameState = new GameState();
export const gameLoop = new GameLoop(gameState);

gameLoop.start();

window.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
        window.location.reload();
    }
});