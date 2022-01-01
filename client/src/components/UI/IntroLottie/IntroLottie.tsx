import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import loadingAnim from '../../../assets/lotties/delivery-animation.json';
import { AnimContainer } from '../loading/Loading.styles';

const IntroLottie = () => {
  const ref = useRef<HTMLDivElement>(null as any);
  useEffect(() => {
    Lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingAnim,
    });
  }, []);
  return (
    <AnimContainer
      ref={ref}
      style={{
        position: 'absolute',
        marginLeft: '40px',
        marginBottom: '120px',
        width: '48%',
      }}
    />
  );
};

export default IntroLottie;
