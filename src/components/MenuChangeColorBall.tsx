import { useContext, useState } from "react";
import { BallsContext } from "../context/balls-contex";

interface MenuChangeColorBallProps {
  selectedBallId: number | null;
}

const MenuChangeColorBall = ({ selectedBallId }: MenuChangeColorBallProps) => {
  const { ballsContext, setBallsContext } = useContext(BallsContext);

  const selectedBall = ballsContext.find((ball) => ball.id === selectedBallId);
  if (!selectedBall) return null;

  const handleColorChange = (newColor: string, ballId: number) => {
    const updatedBalls = ballsContext.map((ball) => {
      if (ball.id === ballId) {
        return { ...ball, color: newColor };
      }
      return ball;
    });
    setBallsContext([...updatedBalls]);
  };

  return (
    <div className="menuChangeColorBall">
      <div key={selectedBall.id}>
        Ball {selectedBall.id}
        <input
          type="color"
          color={selectedBall.color}
          value={selectedBall.color}
          onChange={(e) => handleColorChange(e.target.value, selectedBall.id)}
        />
      </div>
    </div>
  );
};

export default MenuChangeColorBall;
