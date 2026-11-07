import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, AppState, Platform } from 'react-native';

/** Opacity only, native driver; interruption always restores a fully visible surface. */
export function Motion({
  children,
  duration,
  identity,
}: {
  children: ReactNode;
  duration: number;
  identity: string;
}) {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    opacity.stopAnimation();
    opacity.setValue(duration ? 0.75 : 1);
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: Platform.OS !== 'web',
    });
    animation.start();
    const sub = AppState.addEventListener('change', () => {
      opacity.stopAnimation();
      opacity.setValue(1);
    });
    return () => {
      animation.stop();
      sub.remove();
      opacity.setValue(1);
    };
  }, [identity, duration, opacity]);
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}
