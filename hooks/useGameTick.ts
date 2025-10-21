import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { TICK_INTERVAL } from '../constants';

export const useGameTick = () => {
  const gameTick = useGameStore((state) => state.gameTick);

  useEffect(() => {
    const intervalId = setInterval(() => {
      gameTick();
    }, TICK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [gameTick]);
};
