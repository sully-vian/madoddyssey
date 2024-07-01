import { Camera } from '../Camera'

export class Entity {

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string;

    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    isCollidingWith(entity) {
        return (
            this.right > entity.left &&
            this.left < entity.right &&
            this.bottom > entity.top &&
            this.top < entity.bottom
        );
    }

    get middleX(): number {
        return this.x + this.width / 2;
    }

    get middleY(): number {
        return this.y + this.height / 2;
    }

    get left(): number {
        return this.x;
    }

    get right(): number {
        return this.x + this.width;
    }

    get top(): number {
        return this.y;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    set middleX(value: number) {
        this.x = value - this.width / 2;
    }

    set middleY(value: number) {
        this.y = value - this.height / 2;
    }

    set left(value: number) {
        this.x = value;
    }

    set right(value: number) {
        this.x = value - this.width;
    }

    set top(value: number) {
        this.y = value;
    }

    set bottom(value: number) {
        this.y = value - this.height;
    }

    draw(ctx: CanvasRenderingContext2D, camera: Camera): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);
    }
}