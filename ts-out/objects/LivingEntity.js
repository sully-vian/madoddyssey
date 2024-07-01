import { Entity } from "./Entity.js";
import { canvas } from "../canvasSetup.js";
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
                this.handlePlatformCollision(platform);
            }
        }
        if (this.y > canvas.height + 2000) {
            this.die();
            console.log("Dead");
        }
    }
    die() {
        this.dead = true;
        this.color = "black";
    }
    handlePlatformCollision(platform) {
        // handle collision (call only if collision detected)
        // Determine from which side the collision occurred
        let entityBottom = this.bottom - platform.top;
        let entityTop = platform.bottom - this.top;
        let entityLeft = platform.right - this.left;
        let entityRight = this.right - platform.left;
        let collisionSide = Math.min(entityBottom, entityTop, entityLeft, entityRight);
        switch (collisionSide) {
            case entityBottom:
                this.bottom = platform.top; // Place the entity on top of the platform
                this.dy = 0;
                break;
            case entityTop:
                this.top = platform.bottom; // Place the entity below the platform
                this.dy = 0;
                break;
            case entityLeft:
                this.left = platform.right; // Place the entity to the right of the platform
                this.dx = 0;
                break;
            case entityRight:
                this.right = platform.left; // Place the entity to the left of the platform
                this.dx = 0;
                break;
        }
    }
}
