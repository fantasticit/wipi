import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import { elementInViewport } from '@/utils';

export const Opacity: React.FC<{ className?: string }> = ({ className, children }) => {
  const ref = useRef();
  const [styles, animation] = useSpring(() => ({
    opacity: 0,
    config: { mass: 10, tension: 400, friction: 40, precision: 0.00001, clamp: true },
  }));
  const onViewportChange = useCallback((visible) => {
    if (visible) {
      animation.start({ opacity: 1 });
    }
  }, []);

  useEffect(() => {
    if (elementInViewport(ref.current)) {
      animation.start({ opacity: 1 });
    }
  }, []);

  return (
    <VisibilitySensor onChange={onViewportChange}>
      <animated.div className={className} ref={ref} style={styles}>
        {children}
      </animated.div>
    </VisibilitySensor>
  );
};
