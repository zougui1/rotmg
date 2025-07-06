import { LazyMotion, type LazyProps } from 'framer-motion';

const domAnimation = () => import('framer-motion').then(res => res.domAnimation);

export const LazyDomAnimation = (props: LazyDomAnimationProps) => {
  return <LazyMotion {...props} features={domAnimation} />;
}

export interface LazyDomAnimationProps extends Omit<LazyProps, 'features'> {

}
