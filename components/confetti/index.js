import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const ConfettiComponent = () => {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} className="duration-200" />;
};

export default ConfettiComponent;
