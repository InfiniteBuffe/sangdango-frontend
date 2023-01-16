// thanks for https://velog.io/@lnhyen43/TILIntern-React-hooks-Resize-event-Listener

import { useState, useEffect } from 'react';

const getWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }
}

function useResize() {
  if (typeof window !== 'undefined') {
    let [WIDTH, setWIDTH] = useState(getWidth());
    useEffect(() => {
      let timeoutId = null;
      const resizeListener = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setWIDTH(getWidth()), 150)
      };
      window.addEventListener('resize', resizeListener);
      return () => {
        window.removeEventListener('resize', resizeListener)
      }
    }, [])
    return WIDTH;
  }
}

export default useResize