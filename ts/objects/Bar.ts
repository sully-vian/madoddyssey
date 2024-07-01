import { Entity } from "./Entity"

export class Bar extends Entity {

    public value: number;
    public maxValue: number;
    public fillColor: string;

    constructor(x: number, y: number, width: number, height: number, value: number, maxValue: number, barColor: string, fillColor: string) {
        super(x, y, width, height, barColor);
        this.value = value;
        this.maxValue = maxValue;
        this.fillColor = fillColor;
    }

    add(value: number): void {
        this.value += value;
        if (this.value > this.maxValue) {
            this.value = this.maxValue;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        let padding: number = 5;
        const innerWidth: number = this.width - 2 * padding;
        const innerHeight: number = this.height - 2 * padding;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.fillColor;
        const proportion: number = this.value / this.maxValue;
        ctx.fillRect(this.x + padding, this.y + padding, innerWidth * proportion, innerHeight);

        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        // ctx.fillStyle = this.fillColor;
        // const proportion = this.value / this.maxValue;
        // ctx.fillRect(this.x, this.y, this.width * proportion, this.height);
    }
}