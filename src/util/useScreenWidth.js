import { useCallback, useState, useEffect } from 'react';

export default function useScreenWidth() {
  const [width, setWidth] = useState();

  const handleWindowResize = useCallback((e) => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return width;
}
