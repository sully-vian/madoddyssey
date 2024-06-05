import { Entity } from './entity.js';
import { handlePlatformCollisions } from '../collisions.js';
import { canvas } from '../canvasSetup.js';

export class LivingEntity extends Entity {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.dead = false;
        this.dy = 0;
        this.dx = 0;
    }

    update(gravity, level) {

        this.x += this.dx;

        this.dy += gravity;
        this.y += this.dy;

        for (let platform of level.platforms) {
            if (this.isCollidingWith(platform)) {
                handlePlatformCollisions(this, platform);
            }
        }

        if (this.y > canvas.height + 2000
        ) {
            this.die();
            console.log("Dead");
        }
    }

    die() {
        this.dead = true;
        this.color = "black";
    }
}