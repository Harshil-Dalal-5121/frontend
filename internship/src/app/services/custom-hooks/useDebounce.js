import { useEffect, useRef } from "react";

export function useDebounce(cb, duration = 1000) {
  const timer = useRef(null);

  const clearTimer = () => timer.current && clearTimeout(timer.current);
  const setTimer = (cb) => (timer.current = setTimeout(cb, duration));

  useEffect(() => {
    return () => clearTimeout();
  });

  return (...args) => {
    clearTimer();
    setTimer(() => cb(...args));
  };
}
