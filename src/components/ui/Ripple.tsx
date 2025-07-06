import { m, AnimatePresence, type HTMLMotionProps } from 'framer-motion';

import { type RippleType } from '~/hooks';
import { clamp } from '~/utils';

import { LazyDomAnimation } from './LazyDomAnimation';

export const Ripple = ({
  ripples,
  motionProps,
  color = 'currentColor',
  style,
  onClear,
}: RippleProps) => {
  return (
    <>
      {ripples.map(ripple => {
        const duration = clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5);

        return (
          <LazyDomAnimation key={ripple.key}>
            <AnimatePresence mode="popLayout">
              <m.span
                animate={{ transform: 'scale(2)', opacity: 0 }}
                className="z-ripple"
                exit={{ opacity: 0 }}
                initial={{ transform: 'scale(0)', opacity: 0.35 }}
                style={{
                  position: 'absolute',
                  backgroundColor: color,
                  borderRadius: '100%',
                  transformOrigin: 'center',
                  pointerEvents: 'none',
                  overflow: 'hidden',
                  inset: 0,
                  zIndex: 100,
                  left: ripple.x,
                  top: ripple.y,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  ...style,
                }}
                transition={{ duration }}
                onAnimationComplete={() => {
                  onClear(ripple.key);
                }}
                {...motionProps}
              />
            </AnimatePresence>
          </LazyDomAnimation>
        );
      })}
    </>
  );
}

export interface RippleProps extends React.ComponentProps<'span'> {
  ripples: RippleType[];
  onClear: (key: string) => void;
  color?: string;
  motionProps?: Omit<HTMLMotionProps<'span'>, 'ref'>;
}
