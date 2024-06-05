import { canvas } from './canvasSetup.js';
import { Platform } from './objects/platform.js';
import { Cloud } from './objects/cloud.js';
import { random } from './random.js';
import { Enemy } from './objects/enemy.js';
import { Butterfly } from './objects/butterfly.js';

const P_MIN_HGAP = 50;
const P_MAX_HGAP = 250;
const P_MIN_VGAP = -150;
const P_MAX_VGAP = 150;
const P_MIN_WIDTH = 20;
const P_MAX_WIDTH = 120;
const P_HEIGHT = 10;
const C_MIN_GAP = -100;
const C_MAX_GAP = 100;
const C_MIN_WIDTH = 50;
const C_MAX_WIDTH = 150;
const C_MIN_HEIGHT = 20;
const C_MAX_HEIGHT = 50;
const C_MIN_Y = 0;
const C_MAX_Y = 300;

export class Level {
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

    generatePlatform() {
        const newPlatform = this.generateNextPlatform(this.lastPlatform);
        this.platforms.push(newPlatform);
    }

    generateClouds() {
        while (this.lastCloud.right < this.length + 100) {
            const newCloud = this.generateNextCloud(this.lastCloud, this.lastPlatform);
            this.clouds.push(newCloud);
        }
    }

    generateEnemiesAndButterflies() {
        const newPlatform = this.lastPlatform;
        if (newPlatform.width > 100) {
            const newEnemy = this.generateEnemy(newPlatform);
            this.enemies.push(newEnemy);
        } else if (newPlatform.width > 75) {
            const newButterfly = this.generateButterfly(newPlatform);
            this.butterflies.push(newButterfly);
        }
    }

    generateEnemy(newPlatform) {
        const newEnemy = new Enemy(0, 0, 0);
        newEnemy.patrolRange = newPlatform.width - newEnemy.width;
        newEnemy.bottom = newPlatform.top - 10;
        newEnemy.left = newPlatform.left;
        newEnemy.startX = newEnemy.left;
        return newEnemy;
    }

    generateButterfly(newPlatform) {
        const newButterfly = new Butterfly(0, 0);
        newButterfly.bottom = newPlatform.top - 10;
        newButterfly.middleX = newPlatform.middleX;
        return newButterfly;
    }

    get length() {
        return this.lastPlatform.x + this.lastPlatform.width;
    }

    get lastPlatform() {
        return this.platforms[this.platforms.length - 1];
    }

    get lastCloud() {
        return this.clouds[this.clouds.length - 1];
    }

    generateNextPlatform(lastPlatform) {
        const x = lastPlatform.x + lastPlatform.width + random(P_MIN_HGAP, P_MAX_HGAP);
        const y = Math.min(lastPlatform.y + random(P_MIN_VGAP, P_MAX_VGAP), canvas.height - 100);
        const width = random(P_MIN_WIDTH, P_MAX_WIDTH);
        const height = P_HEIGHT;
        return new Platform(x, y, width, height);
    }

    generateNextCloud(lastCloud, lastPlatform) {
        const x = lastCloud.x + lastCloud.width + random(C_MIN_GAP, C_MAX_GAP);
        const y = Math.min(lastPlatform.y - random(C_MIN_Y, C_MAX_Y), canvas.height - 100);
        const width = random(C_MIN_WIDTH, C_MAX_WIDTH);
        const height = random(C_MIN_HEIGHT, C_MAX_HEIGHT);
        return new Cloud(x, y, width, height);
    }
}