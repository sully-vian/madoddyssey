import { canvas } from "./canvasSetup.js";
export class Camera {
    constructor(player) {
        this.player = player;
        this.x = 0;
        this.y = 0;
    }
    update() {
        if (this.player.y > canvas.height + 100)
            return;
        this.x = this.player.x - canvas.width / 8;
        this.y = this.player.y - canvas.height / 2;
    }
}
