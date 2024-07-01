"use strict";
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
window.addEventListener('keydown', function (event) { }); // Add event listener for keydown event
function Player() { }
