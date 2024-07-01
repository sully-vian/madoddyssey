import { LivingEntity } from './LivingEntity.ts';
import { handlePlayerEnemyCollisions, handlePlatformCollisions } from '../collisions.ts';
import { Bar } from './Bar.ts';
import { Camera } from '../Camera.ts';

import {Level} from '../Level.ts';

const JUMP_SPEED = 11;
const SPEED = 5;

export class Player extends LivingEntity {

    public dx: number;
    public dy: number;
    public jumping: boolean;
    public jumpCount: number;
    public faceImage: HTMLImageElement;
    public leftImage: HTMLImageElement;
    public rightImage: HTMLImageElement;
    public energyBar: Bar;

    constructor() {
        super(0, 0, 100, 100, "blue");
        this.dx = 0;
        this.dy = 0;
        this.jumping = false;
        this.jumpCount = 0;

        this.faceImage = new Image();
        this.leftImage = new Image();
        this.rightImage = new Image();
        this.faceImage.src = "../../assets/mado-face.png";
        this.leftImage.src = "../../assets/mado-left.png";
        this.rightImage.src = "../../assets/mado-right.png";

        this.energyBar = new Bar(25, 25, 200, 50, 0, 100, "black", "orange");
    }

    update(gravity: number, level: Level): void {
        super.update(gravity, level);

        for (let enemy of level.enemies) {
            if (this.isCollidingWith(enemy)) {
                handlePlayerEnemyCollisions(this, enemy);
            }
        }
    }

    // wait then reload the level
    die(): void{
        super.die();
    }

    collect(value: number): void {
        this.energyBar.add(value);
    }

    jump(): void{
        if (this.jumpCount < 2) {
            this.dy = -JUMP_SPEED;
            this.jumpCount++;
            this.jumping = true;
        }
    }

    moveRight(): void{
        this.dx = SPEED;
    }

    moveLeft(): void {
        this.dx = -SPEED;
    }

    stopHorizontalMovement(): void{
        this.dx = 0;
    }

    draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
        if (this.dx < 0) {
            ctx.drawImage(this.leftImage,
                this.x - camera.x,
                this.y - camera.y,
                this.width,
                this.height);
        } else if (this.dx > 0) {
            ctx.drawImage(this.rightImage,
                this.x - camera.x,
                this.y - camera.y,
                this.width,
                this.height);
        } else {
            ctx.drawImage(this.faceImage,
                this.x - camera.x,
                this.y - camera.y,
                this.width,
                this.height);
        }
        this.energyBar.draw(ctx);
    }
}