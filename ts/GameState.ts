import { Camera } from "./Camera";
import { Level } from "./Level";
import { ctx } from "./canvasSetup";
import { Player } from "./objects/Player";
import { LivingEntity } from "./objects/LivingEntity";

export class GameState {

    public player: Player;
    public camera: Camera;
    public gravity: number;
    public level: Level;
    public livingEntities: LivingEntity[];

    constructor() {
        this.player = new Player();
        this.camera = new Camera(this.player);
        this.gravity = 0.5;
        this.level = new Level();
    }

    update(): void{
        this.livingEntities = [
            this.player,
            ...this.level.enemies,
            ...this.level.butterflies
        ];

        this.camera.update();

        this.level.update(this.player);

        for (let livingEntity of this.livingEntities) {
            if (!livingEntity.dead) {
                livingEntity.update(this.gravity, this.level);
            }
            livingEntity.draw(ctx, this.camera);
        }

        for (let butterfly of this.level.butterflies) {
            if (!butterfly.collected && this.player.isCollidingWith(butterfly)) {
                butterfly.collect();
                this.player.collect(butterfly.energy);
            }
        }

        for (let platform of this.level.platforms) {
            platform.draw(ctx, this.camera);
        }

        for (let cloud of this.level.clouds) {
            cloud.draw(ctx, this.camera);
        }
    }
}