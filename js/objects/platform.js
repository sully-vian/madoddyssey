import { Entity } from './entity.js';

export class Platform extends Entity {
    constructor(x, y, width, height) {
        super(x, y, width, height, "green");
    }
}