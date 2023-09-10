import { useEffect, useState } from 'react';

const useResize = () => {
  const [windowOptions, setWindowOptions] = useState({ width: 0, height: 0 });

  const setWindowOptionsHandler = () => {
    setWindowOptions({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    setWindowOptionsHandler();
    window.addEventListener('resize', setWindowOptionsHandler);
    return () => {
      window.removeEventListener('resize', setWindowOptionsHandler);
    };
  }, []);
  return windowOptions;
};

export default useResize;
