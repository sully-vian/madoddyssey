import { LivingEntity } from './livingEntity.js';
import { handlePlayerEnemyCollisions, handlePlatformCollisions } from '../collisions.js';
import { Bar } from './bar.js';

const JUMP_SPEED = 11;
const SPEED = 5;

export class Player extends LivingEntity {
    constructor() {
        super(0, 0, 50, 50, "blue");
        this.dx = 0;
        this.dy = 0;
        this.jumping = false;
        this.jumpCount = 0;
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
        super.draw(ctx, camera);
        this.energyBar.draw(ctx);
    }
}