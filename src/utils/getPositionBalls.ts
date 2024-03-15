interface Balls {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  id: number;
  ballRadius: number;
  massa:number;
}

export function getPositionBalls(width: number, height: number): Balls[] {
  const balls: Balls[] = [];
  const numRows = 5;
  const ballRadius = 12;
  const rowOffset = ballRadius * Math.sqrt(20);
  const colOffset = ballRadius * 2.2;

  const centerX = width / 2;
  const centerY = height / 2;

  const colors: string[] = [
    "red",
    "orange",
    "blue",
    "white",
    "brown",
    "green",
    "yellow",
    "pink",
    "indigo",
    "violet",
    "coral",
    "olive",
  ];

  let index = 0;
  for (let i = 0; i < numRows; i++) {
    const startX = centerX - (i * colOffset) / 2;
    const startY = centerY + (i * rowOffset) / 2;
    for (let j = 0; j <= i; j++) {
      const x = startX + j * colOffset;
      const y = startY - i * rowOffset;
      balls.push({
        x,
        y,
        vx: 0,
        vy: 0,
        color: colors[index % colors.length],
        id: index,
        ballRadius: 12,
        massa:0.25,
      });
      index++;
    }
  }

  return balls;
}
