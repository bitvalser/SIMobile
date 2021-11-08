import { useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

export const useTimerAnimation = (
  initialTime: number,
): [Animated.Value, () => void, () => void, (time?: number) => void, () => boolean] => {
  const timerAnim = useRef(new Animated.Value(0)).current;
  const startTime = useRef<number>(null);
  const currentTime = useRef<number>(null);
  const timerTime = useRef<number>(initialTime);
  const animationRef = useRef<Animated.CompositeAnimation>(
    Animated.timing(timerAnim, {
      toValue: 100,
      useNativeDriver: false,
      easing: Easing.linear,
      duration: initialTime,
    }),
  );

  const start = useCallback(() => {
    const dateNow = Date.now();
    if (startTime.current === null) {
      animationRef.current = Animated.timing(timerAnim, {
        toValue: 100,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: timerTime.current,
      });
      animationRef.current.start(() => {
        currentTime.current = 0;
      });
      startTime.current = dateNow;
      currentTime.current = timerTime.current;
    } else if (currentTime.current > 0) {
      animationRef.current = Animated.timing(timerAnim, {
        toValue: 100,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: currentTime.current,
      });
      animationRef.current.start();
      startTime.current = dateNow;
    }
  }, [timerAnim]);

  const pause = useCallback(() => {
    if (startTime.current !== 0) {
      animationRef.current.stop();
      currentTime.current = timerTime.current - (Date.now() - startTime.current);
    }
  }, []);

  const reset = useCallback(
    (newTime?: number) => {
      if (newTime) {
        timerTime.current = newTime;
      }
      timerAnim.setValue(0);
      animationRef.current = Animated.timing(timerAnim, {
        toValue: 100,
        useNativeDriver: false,
        easing: Easing.linear,
        duration: timerTime.current,
      });
      startTime.current = null;
      currentTime.current = null;
    },
    [timerAnim],
  );

  const isStarted = useCallback(() => {
    return startTime.current !== null;
  }, []);

  return [timerAnim, start, pause, reset, isStarted];
};
