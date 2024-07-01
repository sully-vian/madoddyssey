import { canvas } from './canvasSetup.ts';
import { Platform } from './objects/Platform.ts';
import { Cloud } from './objects/Cloud.ts';
import { random } from './random.ts';
import { Enemy } from './objects/Enemy.ts';
import { Butterfly } from './objects/Butterfly.ts';
import { Entity } from './objects/Entity.ts';
import { LivingEntity } from './objects/LivingEntity.ts';

const P_MIN_HGAP: number = 50;
const P_MAX_HGAP: number = 250;
const P_MIN_VGAP: number = -150;
const P_MAX_VGAP: number = 150;
const P_MIN_WIDTH: number = 20;
const P_MAX_WIDTH: number = 120;
const P_HEIGHT: number = 10;
const C_MIN_GAP: number = -100;
const C_MAX_GAP: number = 100;
const C_MIN_WIDTH: number = 50;
const C_MAX_WIDTH: number = 150;
const C_MIN_HEIGHT: number = 20;
const C_MAX_HEIGHT: number = 50;
const C_MIN_Y: number = 0;
const C_MAX_Y: number = 300;

export class Level {

    public platforms: Platform[];
    public clouds: Cloud[];
    public enemies: Enemy[];
    public butterflies: Butterfly[];

    constructor() {
        this.platforms = [new Platform(0, canvas.height - 10, 100, 10)];
        this.clouds = [new Cloud(-50, canvas.height - 200, 100, 35)];
        this.enemies = [];
        this.butterflies = [];
    }

    update(player) {
        this.generateEntities(player);
    }

    generateEntities(player) {
        const generateDistance = 1000;
        if (player.x > this.length - generateDistance) {
            this.generatePlatform();
            this.generateClouds();
            this.generateEnemiesAndButterflies();
        }
    }

    generatePlatform(): void {
        const newPlatform: Platform = this.generateNextPlatform(this.lastPlatform);
        this.platforms.push(newPlatform);
    }

    generateClouds(): void {
        while (this.lastCloud.right < this.length + 100) {
            const newCloud: Cloud = this.generateNextCloud(this.lastCloud, this.lastPlatform);
            this.clouds.push(newCloud);
        }
    }

    generateEnemiesAndButterflies(): void {
        const newPlatform: Platform = this.lastPlatform;
        if (newPlatform.width > 100) {
            const newEnemy = this.generateEnemy(newPlatform);
            this.enemies.push(newEnemy);
        } else if (newPlatform.width > 75) {
            const newButterfly = this.generateButterfly(newPlatform);
            this.butterflies.push(newButterfly);
        }
    }

    generateEnemy(newPlatform: Platform): Enemy {
        const newEnemy: Enemy = new Enemy(0, 0, 0);
        newEnemy.patrolRange = newPlatform.width - newEnemy.width;
        newEnemy.bottom = newPlatform.top - 10;
        newEnemy.left = newPlatform.left;
        newEnemy.startX = newEnemy.left;
        return newEnemy;
    }

    generateButterfly(newPlatform: Platform): Butterfly {
        const newButterfly: Butterfly = new Butterfly(0, 0);
        newButterfly.bottom = newPlatform.top - 10;
        newButterfly.middleX = newPlatform.middleX;
        return newButterfly;
    }

    get length(): number {
        return this.lastPlatform.x + this.lastPlatform.width;
    }

    get lastPlatform(): Platform {
        return this.platforms[this.platforms.length - 1];
    }

    get lastCloud(): Cloud {
        return this.clouds[this.clouds.length - 1];
    }

    generateNextPlatform(lastPlatform: Platform): Platform {
        const x = lastPlatform.x + lastPlatform.width + random(P_MIN_HGAP, P_MAX_HGAP);
        const y = Math.min(lastPlatform.y + random(P_MIN_VGAP, P_MAX_VGAP), canvas.height - 100);
        const width = random(P_MIN_WIDTH, P_MAX_WIDTH);
        const height = P_HEIGHT;
        return new Platform(x, y, width, height);
    }

    generateNextCloud(lastCloud: Cloud, lastPlatform: Platform): Cloud {
        const x: number = lastCloud.x + lastCloud.width + random(C_MIN_GAP, C_MAX_GAP);
        const y: number = Math.min(lastPlatform.y - random(C_MIN_Y, C_MAX_Y), canvas.height - 100);
        const width: number = random(C_MIN_WIDTH, C_MAX_WIDTH);
        const height: number = random(C_MIN_HEIGHT, C_MAX_HEIGHT);
        return new Cloud(x, y, width, height);
    }
}