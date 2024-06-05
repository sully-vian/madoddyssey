export function drawGrid(context, gridPixelSize) {
    const width = context.canvas.width;
    const height = context.canvas.height;

    context.strokeStyle = "black";
    context.lineWidth = 0.5;

    // vertical lines
    for (let x = 0; x < width; x += gridPixelSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
    }

    // horizontal lines
    for (let y = 0; y < height; y += gridPixelSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
    }
}