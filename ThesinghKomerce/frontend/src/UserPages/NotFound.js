import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/JSON/notfound.json';
// import {defaultOptions4} from '../lotties/defaultOption';
const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={'90vh'} width={'100vw'} />
      <>hi</>
    </div>
  );
};
export default NotFound;
