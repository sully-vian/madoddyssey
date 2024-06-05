/**
 * Generate a random number between the min and max values
 * @param {*} min minimum value
 * @param {*} max maximum value
 * @returns random number
 */
export function random(min, max) {
    return Math.random() * (max - min) + min;
}