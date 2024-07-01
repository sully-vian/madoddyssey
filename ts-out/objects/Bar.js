import { Entity } from "./Entity.js";
export class Bar extends Entity {
    constructor(x, y, width, height, value, maxValue, barColor, fillColor) {
        super(x, y, width, height, barColor);
        this.value = value;
        this.maxValue = maxValue;
        this.fillColor = fillColor;
    }
    add(value) {
        this.value += value;
        if (this.value > this.maxValue) {
            this.value = this.maxValue;
        }
    }
    draw(ctx) {
        let padding = 5;
        const innerWidth = this.width - 2 * padding;
        const innerHeight = this.height - 2 * padding;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        const proportion = this.value / this.maxValue;
        ctx.fillRect(this.x + padding, this.y + padding, innerWidth * proportion, innerHeight);
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.fillStyle = this.fillColor;
        // const proportion = this.value / this.maxValue;
        // ctx.fillRect(this.x, this.y, this.width * proportion, this.height);
    }
}
