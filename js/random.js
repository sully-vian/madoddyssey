/**
 * Generate a random number between the min and max values
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number} random number
 */
export function random(min, max) {
    return Math.random() * (max - min) + min;
}
