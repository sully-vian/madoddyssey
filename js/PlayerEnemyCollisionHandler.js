export class PlayerEnemyCollisionHandler {
    static handleCollision(player, enemy) {
        // handle collision (call only if collision detected)
        if (player.bottom >= enemy.top - 10 && player.dy > 0) {
            this.playerLandsOnEnemy(player, enemy);
        }
        else {
            this.playerHitsEnemy(player, enemy);
        }
    }
    static playerLandsOnEnemy(player, enemy) {
        if (!enemy.dead) {
            enemy.die();
        }
        // bounce if player is falling
        player.bottom = enemy.top;
        player.jump();
        player.jumpCount = 0;
    }
    static playerHitsEnemy(player, enemy) {
        if (enemy.dead) {
            player.handlePlatformCollision(enemy);
        }
        else {
            player.die();
        }
    }
}
