export class Entity {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    isCollidingWith(entity) {
        return (this.right > entity.left &&
            this.left < entity.right &&
            this.bottom > entity.top &&
            this.top < entity.bottom);
    }
    get middleX() {
        return this.x + this.width / 2;
    }
    get middleY() {
        return this.y + this.height / 2;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }
    get top() {
        return this.y;
    }
    get bottom() {
        return this.y + this.height;
    }
    set middleX(value) {
        this.x = value - this.width / 2;
    }
    set middleY(value) {
        this.y = value - this.height / 2;
    }
    set left(value) {
        this.x = value;
    }
    set right(value) {
        this.x = value - this.width;
    }
    set top(value) {
        this.y = value;
    }
    set bottom(value) {
        this.y = value - this.height;
    }
    draw(ctx, camera) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - camera.x, this.y - camera.y, this.width, this.height);
    }
}
