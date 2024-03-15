interface Balls {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  id: number;
}

export function drawBalls(context: CanvasRenderingContext2D, balls: Balls[]) {
  const ballRadius = 12; 
  balls.forEach((ball) => {
    context.fillStyle = ball.color; 
    context.beginPath();
    context.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI); 
    context.fill();
  });
}
