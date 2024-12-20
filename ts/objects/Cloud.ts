import { Camera } from "../Camera.js";
import { Entity } from "./Entity.js";

export class Cloud extends Entity {
    constructor(x:number, y:number, width:number, height:number) {
        super(x, y, width, height, "white");
    }

    draw(ctx: CanvasRenderingContext2D, camera: Camera) {
        ctx.globalAlpha = 0.8;
        super.draw(ctx, camera);
        ctx.globalAlpha = 1;
    }
}