import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Canvas from "./Canvas";
import { drawTable } from "../utils/drawTable";
import { getPositionBalls } from "../utils/getPositionBalls";
import MenuChangeColorBall from "./MenuChangeColorBall";
import { BallsContext } from "../context/balls-contex";

interface Balls {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  id: number;
  onUpdateBalls?: (updatedBalls: Balls[]) => void;
  ballRadius: number;
  massa: number;
}

const TableBilliard: React.FC = () => {
  const { ballsContext, setBallsContext } = useContext(BallsContext);
  const ballRadius = 12;
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [selectedBallId, setSelectedBallId] = useState<number | null>(1);

  const requestRef = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (canvasRef.current !== null) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mouseX = event.clientX - canvasRect.left;
      const mouseY = event.clientY - canvasRect.top;

      const canvasX = (mouseX / canvasRect.width) * canvasRef.current.width;
      const canvasY = (mouseY / canvasRect.height) * canvasRef.current.height;

      mousePositionRef.current = { x: canvasX, y: canvasY };
    }
  };

  useEffect(() => {
    const updateMousePosition = () => {
      setMousePosition(mousePositionRef.current);
    };

    document.addEventListener("mousemove", updateMousePosition);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const updateBalls = useCallback(() => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastUpdateTime;

    setBallsContext((balls: any): any => {
      let updatedBalls = [...balls];

      updatedBalls = updatedBalls.map((ball, index) => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;

        const dx = Math.abs(ball.x - mousePosition.x);
        const dy = Math.abs(ball.y - mousePosition.y);
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseAccelerationRadius = !isEditable ? 30 : 0;

        if (distanceToMouse <= mouseAccelerationRadius) {
          const maxAcceleration = 10; // Тут у нас скорость шарика
          const impulseFactor = maxAcceleration * ball.massa; // А это импульс. Если добавить разного веса шарика, то можно сделать так, чтобы шарики разного веса ускорялись по разному

          const accelerationX =
            mousePosition.x < ball.x ? impulseFactor : -impulseFactor;
          const accelerationY =
            mousePosition.y < ball.y ? impulseFactor : -impulseFactor;

          ball.vx += accelerationX;
          ball.vy += accelerationY;
        }

        for (let i = index + 1; i < updatedBalls.length; i++) {
          const otherBall = updatedBalls[i];
          const dx = otherBall.x - newX;
          const dy = otherBall.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = ballRadius * 2;

          if (distance < minDistance) {
            const collisionNormalX = dx / distance;
            const collisionNormalY = dy / distance;
            const overlap = minDistance - distance;

            newX -= collisionNormalX * overlap * 0.5;
            newY -= collisionNormalY * overlap * 0.5;
            otherBall.x += collisionNormalX * overlap * 0.5;
            otherBall.y += collisionNormalY * overlap * 0.5;
          }
        }

        if (newX < 40 + ballRadius || newX > 760 - ballRadius) {
          ball.vx *= -1;
          newX = Math.max(40 + ballRadius, Math.min(newX, 760 - ballRadius));
        }
        if (newY < 40 + ballRadius || newY > 460 - ballRadius) {
          ball.vy *= -1;
          newY = Math.max(40 + ballRadius, Math.min(newY, 460 - ballRadius));
        }

        const decayFactor = 0.002; // Коэфицент затухания. Чем меньше, тем дольше будет затухать ускорение шарика
        ball.vx *= Math.exp(-decayFactor * timeDiff);
        ball.vy *= Math.exp(-decayFactor * timeDiff);

        if (Math.abs(ball.vx) < 0.01) ball.vx = 0;
        if (Math.abs(ball.vy) < 0.01) ball.vy = 0;

        return { ...ball, x: newX, y: newY };
      });

      setLastUpdateTime(currentTime);

      return updatedBalls;
    });

    requestRef.current = requestAnimationFrame(updateBalls);
  }, [lastUpdateTime, mousePosition.x, mousePosition.y]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateBalls);
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [updateBalls]);

  const onUpdateBalls = (updatedBalls: Balls[]) => {
    setBallsContext(updatedBalls);
  };
  const handleClick = () => {
    setIsEditable(!isEditable);
  };

  const handleBallClick = (ballId: number) => {
    setSelectedBallId(ballId);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Canvas
        canvasRef={canvasRef}
        balls={ballsContext}
        drawTable={drawTable}
        height={500}
        width={800}
        ballRadius={ballRadius}
        onUpdateBalls={onUpdateBalls}
        onBallClick={handleBallClick}
        selectedBallId={selectedBallId}
      />
      {selectedBallId !== null && isEditable}

      {isEditable && selectedBallId !== null && (
        <MenuChangeColorBall selectedBallId={selectedBallId} />
      )}
      <button onClick={handleClick}>On/off EditableMod</button>
    </div>
  );
};

export default TableBilliard;
