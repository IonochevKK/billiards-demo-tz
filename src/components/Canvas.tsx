import React, { useEffect, useRef } from "react";
import { drawBalls } from "../utils/drawBalls";

interface Balls {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  ballRadius: number;
  massa: number;
}

interface CanvasProps {
  balls: Balls[];
  drawTable: (context: CanvasRenderingContext2D) => void;
  height: number;
  width: number;
  onUpdateBalls: (updatedBalls: Balls[]) => void;
  ballRadius: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onBallClick: (ballId: number) => void;

  selectedBallId: number | null;
}

const Canvas: React.FC<CanvasProps> = ({
  balls,
  drawTable,
  height,
  width,
  onUpdateBalls,
  ballRadius,
  canvasRef,
  onBallClick,
  selectedBallId,
}) => {
  const selectedBallRef = useRef<Balls | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!selectedBallRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const updatedBalls = balls.map((ball) => {
        if (ball.id === selectedBallRef.current?.id) {
          return { ...ball, x: mouseX, y: mouseY };
        }
        return ball;
      });
      onUpdateBalls(updatedBalls);
    };

    const handleMouseDown = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const clickedBall = balls.find((ball) => {
        const dx = ball.x - mouseX;
        const dy = ball.y - mouseY;
        return Math.sqrt(dx * dx + dy * dy) <= 12;
      });
      if (clickedBall) {
        selectedBallRef.current = clickedBall;
      }
    };

    const handleMouseUp = () => {
      selectedBallRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [balls, height, onUpdateBalls, width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, width, height);

    drawTable(context);
    
    drawBalls(context, balls);
  }, [balls, drawTable, height, width]);

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const clickedBall = balls.find((ball) => {
      const dx = ball.x - mouseX;
      const dy = ball.y - mouseY;
      return Math.sqrt(dx * dx + dy * dy) <= 12;
    });
    if (clickedBall) {
      onBallClick(clickedBall.id);
    }
  };
  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      onClick={(e) => handleClick(e)}
    />
  );
};

export default Canvas;
