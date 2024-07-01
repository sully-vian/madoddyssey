import { Player } from "./objects/Player.js";
export function handlePlatformCollisions(entity, platform) {
    // handle collision (call only if collision detected)
    // Determine from which side the collision occurred
    let entityBottom = entity.bottom - platform.top;
    let entityTop = platform.bottom - entity.top;
    let entityLeft = platform.right - entity.left;
    let entityRight = entity.right - platform.left;
    let collisionSide = Math.min(entityBottom, entityTop, entityLeft, entityRight);
    switch (collisionSide) {
        case entityBottom:
            entity.bottom = platform.top; // Place the entity on top of the platform
            entity.dy = 0;
            if (entity instanceof Player) {
                entity.jumping = false;
                entity.jumpCount = 0;
            }
            break;
        case entityTop:
            entity.top = platform.bottom; // Place the entity below the platform
            entity.dy = 0;
            break;
        case entityLeft:
            entity.left = platform.right; // Place the entity to the right of the platform
            entity.dx = 0;
            break;
        case entityRight:
            entity.right = platform.left; // Place the entity to the left of the platform
            entity.dx = 0;
            break;
    }
}
