import React, { createContext, useState } from "react";
import { getPositionBalls } from "../utils/getPositionBalls";

interface Balls {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  id: number;
  ballRadius: number;
  massa: number;
}

interface ValueProps {
  ballsContext: Balls[];
  setBallsContext: (balls: any) => any;
}

const defaultBalls: Balls[] = getPositionBalls(800, 500);

export const BallsContext = createContext<ValueProps>({
  ballsContext: defaultBalls,
  setBallsContext: () => {},
});

export function BallsContextProvider({ children }: React.PropsWithChildren) {
  const [ballsContext, setBallsContext] = useState<Balls[]>(defaultBalls);
  return (
    <BallsContext.Provider value={{ ballsContext, setBallsContext }}>
      {children}
    </BallsContext.Provider>
  );
}
