import { LivingEntity } from "./LivingEntity";
import { Level } from "../Level";

export class Enemy extends LivingEntity {

    public speed: number;
    public startX: number;
    public patrolRange: number;
    public patrolDirection: number;
    public hasTurned: boolean;

    constructor(x: number, y: number, patrolRange: number) {
        super(x, y, 50, 50, "red");
        this.speed = 2;
        this.startX = x;
        this.patrolRange = patrolRange;
        this.patrolDirection = 1;
        this.hasTurned = false;
    }

    update(gravity: number, level: Level): void {
        super.update(gravity, level);
        this.patrol();
    }

    patrol(): void {
        if (this.x > this.startX + this.patrolRange) {
            this.patrolDirection = -1;
        } else if (this.x < this.startX) {
            this.patrolDirection = 1;
        }
        this.dx = this.speed * this.patrolDirection;
    }
}