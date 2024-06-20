import { LivingEntity } from './livingEntity.js';
import { handlePlayerEnemyCollisions, handlePlatformCollisions } from '../collisions.js';
import { Bar } from './bar.js';

const JUMP_SPEED = 11;
const SPEED = 5;

export class Player extends LivingEntity {
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

    update(gravity, level) {
        super.update(gravity, level);

        for (let enemy of level.enemies) {
            if (this.isCollidingWith(enemy)) {
                handlePlayerEnemyCollisions(this, enemy);
            }
        }
    }

    // wait then reload the level
    die() {
        super.die();
    }

    collect(value) {
        this.energyBar.add(value);
    }

    jump() {
        if (this.jumpCount < 2) {
            this.dy = -JUMP_SPEED;
            this.jumpCount++;
            this.jumping = true;
        }
    }

    moveRight() {
        this.dx = SPEED;
    }

    moveLeft() {
        this.dx = -SPEED;
    }

    stopHorizontalMovement() {
        this.dx = 0;
    }

    draw(ctx, camera) {
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