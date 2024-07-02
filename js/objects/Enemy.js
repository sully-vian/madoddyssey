import { LivingEntity } from "./LivingEntity.js";
export class Enemy extends LivingEntity {
    constructor(x, y, patrolRange) {
        super(x, y, 50, 50, "red");
        this.speed = 2;
        this.startX = x;
        this.patrolRange = patrolRange;
        this.patrolDirection = 1;
        this.hasTurned = false;
    }
    update(gravity, level) {
        super.update(gravity, level);
        this.patrol();
    }
    patrol() {
        if (this.x > this.startX + this.patrolRange) {
            this.patrolDirection = -1;
        }
        else if (this.x < this.startX) {
            this.patrolDirection = 1;
        }
        this.dx = this.speed * this.patrolDirection;
    }
}
