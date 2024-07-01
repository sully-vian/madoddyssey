export function drawGrid(ctx, gridPixelSize) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    // vertical lines
    for (let x = 0; x < width; x += gridPixelSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    // horizontal lines
    for (let y = 0; y < height; y += gridPixelSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}
