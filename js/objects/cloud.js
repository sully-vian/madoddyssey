import { Entity } from "./entity.js";

export class Cloud extends Entity {
    constructor(x, y, width, height) {
        super(x, y, width, height, "white");
    }

    draw(ctx, camera) {
        ctx.globalAlpha = 0.8;
        super.draw(ctx, camera);
        ctx.globalAlpha = 1;
    }
}