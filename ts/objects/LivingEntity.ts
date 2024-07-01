import { Entity } from './Entity.ts';
import { handlePlatformCollisions } from '../collisions.ts';
import { canvas } from '../canvasSetup.ts';

import {Level} from '../Level.ts';

export class LivingEntity extends Entity {

    public dead: boolean;
    public dy: number;
    public dx: number;

    constructor(x:number, y: number, width:number, height: number, color: string) {
        super(x, y, width, height, color);
        this.dead = false;
        this.dy = 0;
        this.dx = 0;
    }

    update(gravity: number, level: Level): void{

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