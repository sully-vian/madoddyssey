export class Level {
    constructor() {
        this.platforms = [new Platform(0, canvas.height - 10, 100, 10)];
        this.clouds = [new Cloud(100, 0, 100, 35)];
        this.enemies = [];
        this.butterflies = [];
    }

    update(player) {
        this.generateEntities(player);
    }

    generateEntities(player) {
        const generateDistance = 500; // Adjust this value as needed
        if (player.x > this.platforms[this.platforms.length - 1].x - generateDistance) {
            const newPlatform = this.generateNextPlatform(this.platforms[this.platforms.length - 1]);
            this.platforms.push(newPlatform);

            const newCloud = this.generateNextCloud(this.clouds[this.clouds.length - 1]);
            this.clouds.push(newCloud);

            if (newPlatform.width > 75 && newPlatform.width < 100) {
                const newButterfly = new Butterfly(0, 0);
                newButterfly.bottom = newPlatform.top - 10;
                newButterfly.middleX = newPlatform.middleX;
                this.butterflies.push(newButterfly);
            }

            if (newPlatform.width > 100) {
                const newEnemy = new Enemy(0, 0, 0);
                newEnemy.patrolRange = newPlatform.width - newEnemy.width;
                newEnemy.bottom = newPlatform.top - 10;
                newEnemy.left = newPlatform.left;
                newEnemy.startX = newEnemy.left;
                this.enemies.push(newEnemy);
            }
        }
    }

    generateNextPlatform(lastPlatform) {
        const x = lastPlatform.x + lastPlatform.width + random(P_MIN_HGAP, P_MAX_HGAP);
        const y = Math.min(lastPlatform.y + random(P_MIN_VGAP, P_MAX_VGAP), canvas.height - 100);
        const width = random(P_MIN_WIDTH, P_MAX_WIDTH);
        const height = P_HEIGHT;
        return new Platform(x, y, width, height);
    }

    generateNextCloud(lastCloud) {
        const x = lastCloud.x + lastCloud.width + random(C_MIN_GAP, C_MAX_GAP);
        const y = random(C_MIN_Y, C_MAX_Y);
        const width = random(C_MIN_WIDTH, C_MAX_WIDTH);
        const height = random(C_MIN_HEIGHT, C_MAX_HEIGHT);
        return new Cloud(x, y, width, height);
    }
}