import React, { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import { elementInViewport } from '@/utils';

export const Opacity: React.FC<{
  containerProps?: Record<string, unknown>;
  from?: Record<string, number>;
  to?: Record<string, number>;
}> = ({ containerProps = {}, from = {}, to = {}, children }) => {
  const ref = useRef();
  const [styles, animation] = useSpring(() => ({
    opacity: 0,
    ...from,
    config: { mass: 10, tension: 400, friction: 40, precision: 0.00001, clamp: true },
  }));
  const onViewportChange = useCallback((visible) => {
    if (visible) {
      animation.start({ opacity: 1, ...to });
    }
  }, []);

  useEffect(() => {
    if (elementInViewport(ref.current)) {
      animation.start({ opacity: 1, ...to });
    }
  }, []);

  return (
    <VisibilitySensor onChange={onViewportChange}>
      <animated.div {...containerProps} ref={ref} style={styles}>
        {children}
      </animated.div>
    </VisibilitySensor>
  );
};
