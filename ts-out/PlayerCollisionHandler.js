export class PlayerEnemyCollisionHandler {
    static handlePlatformCollision(player, platform) {
        // handle collision (call only if collision detected)
        // Determine from which side the collision occurred
        let playerBottom = player.bottom - platform.top;
        let playerTop = platform.bottom - player.top;
        let playerLeft = platform.right - player.left;
        let playerRight = player.right - platform.left;
        let collisionSide = Math.min(playerBottom, playerTop, playerLeft, playerRight);
        switch (collisionSide) {
            case playerBottom:
                player.bottom = platform.top; // Place the player on top of the platform
                player.dy = 0;
                player.jumping = false;
                player.jumpCount = 0;
                break;
            case playerTop:
                player.top = platform.bottom; // Place the player below the platform
                player.dy = 0;
                break;
            case playerLeft:
                player.left = platform.right; // Place the player to the right of the platform
                player.dx = 0;
                break;
            case playerRight:
                player.right = platform.left; // Place the player to the left of the platform
                player.dx = 0;
                break;
        }
    }
    static handleEnemyCollision(player, enemy) {
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
            this.handlePlatformCollision(player, enemy);
        }
        else {
            player.die();
        }
    }
}
