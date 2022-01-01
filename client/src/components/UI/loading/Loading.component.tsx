import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import loadingAnim from '../../../assets/lotties/pizza_phone.json';
import { AnimContainer } from './Loading.styles';

const Loading: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null as any);
  useEffect(() => {
    Lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: loadingAnim,
    });
  }, []);
  return <AnimContainer ref={ref} />;
};

export default Loading;
