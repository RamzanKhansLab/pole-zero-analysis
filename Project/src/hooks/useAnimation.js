import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Animation hook for frequency sweep.
 */
export function useAnimation(onUpdate) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0.03);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  const animate = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    onUpdate(delta);

    animFrameRef.current = requestAnimationFrame(animate);
  }, [onUpdate]);

  const play = useCallback(() => {
    setIsPlaying(true);
    lastTimeRef.current = 0;
    animFrameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return { isPlaying, speed, setSpeed, play, pause, toggle };
}
