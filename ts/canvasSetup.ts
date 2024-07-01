export const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
export const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;