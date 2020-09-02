import { useState, useEffect } from "react";

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [noiseRunning, setNoiseRunning] = useState(false);
  const [noiseTime, setNoiseTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 0.01);
        if (noiseRunning) {
          setNoiseTime((prevNoiseTime) => prevNoiseTime + 0.01);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, noiseRunning]);

  return {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime,
    noiseRunning,
    setNoiseRunning,
    noiseTime,
    setNoiseTime,
  };
};

export const useStopwatch = () => {
  const {
    isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime,
    noiseRunning,
    setNoiseRunning,
    noiseTime,
    setNoiseTime,
  } = useTimer();

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setNoiseRunning(false);
    setNoiseTime(0);
  };

  
  return {
    elapsedTime: elapsedTime.toFixed(2),
    noiseTime: noiseTime.toFixed(2),
    resetTimer: () => handleReset(),
    startTimer: () => setIsRunning(true),
    stopTimer: () => setIsRunning(false),
    startNoiseTimer: () => setNoiseRunning(true),
    stopNoiseTimer: () => setNoiseRunning(false),
    isRunning,
    noiseRunning,
  };
};
