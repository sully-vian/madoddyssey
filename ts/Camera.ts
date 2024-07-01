import { canvas } from "./canvasSetup.js";
import { Player } from "./objects/Player.js";

export class Camera {

    public player: Player;
    public x: number;
    public y: number;

    constructor(player: Player) {
        this.player = player;
        this.x = 0;
        this.y = 0;
    }

    update(): void {
        if (this.player.y > canvas.height + 100) return;
        this.x = this.player.x  - canvas.width / 8;
        this.y = this.player.y - canvas.height / 2;
    }
}
