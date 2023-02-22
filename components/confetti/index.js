import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width*0.95} height={height*0.95} className="duration-200" />;
};

export default ConfettiComponent;
