import { gameState } from './main';

window.addEventListener('keydown', function (event) {
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

window.addEventListener('keyup', function (event) {
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