
import { Camera } from "../Camera";
import { Level } from "../Level";
import { LivingEntity } from "./LivingEntity";

export class Butterfly extends LivingEntity {

    public energy: number;
    public collected: boolean;
    public image: HTMLImageElement;
    public frameIndex: number;
    public frameCount: number;
    public frameHeight: number;
    public time: number;
    public amplitude: number;

    constructor(x, y) {
        super(x, y, 50, 50, "orange");
        this.energy = 10;
        this.collected = false;

        this.image = new Image();
        this.image.src = "../../assets/butterfly_spritesheet.png";
        this.frameIndex = 0;
        this.frameCount = 84; // number of frames
        this.image.onload = () => {
            this.frameHeight = this.image.height / this.frameCount;
        }

        this.time = 0;
        this.amplitude = 10;
    }

    update(gravity: number, level: Level): void {
        this.time += 0.05;
    }

    collect(): void {
        this.collected = true;
    }

    draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
        if (this.collected) return;
        // super.draw(ctx, camera);
        const y: number = this.y + Math.sin(this.time) * this.amplitude;
        ctx.drawImage(this.image,
            0, this.frameHeight * this.frameIndex,
            this.image.width, this.frameHeight,
            this.x - camera.x,
            y - camera.y,
            this.width,
            this.height);
        this.frameIndex = (this.frameIndex + 1) % this.frameCount;
    }
}