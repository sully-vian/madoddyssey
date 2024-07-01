import { gameState } from "./main.js";

window.addEventListener("keydown", function (event: KeyboardEvent) {
    if (gameState.player.dead) return;

    switch (event.code) {
        case "Space":
            gameState.player.jump();
            break;

        case "ArrowRight":
            gameState.player.moveRight();
            break;

        case "ArrowLeft":
            gameState.player.moveLeft();
            break;

        default:
            console.log("key not mapped");
            break;
    }
});

window.addEventListener("keyup", function (event: KeyboardEvent) {
    switch (event.code) {
        case "Enter":
            // do nothing
            break;
        case "ArrowRight":
        case "ArrowLeft":
            gameState.player.stopHorizontalMovement();
            break;

        default:
            break;
    }
});