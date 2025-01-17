import { RefObject, useEffect, useState } from 'react';

export const useIsIFrameLoaded = (iframeRef: RefObject<HTMLIFrameElement>): boolean => {
  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false);
  const iframeCurrent = iframeRef.current;

  useEffect(() => {
    iframeCurrent?.addEventListener('load', () => setIsIFrameLoaded(true));

    return () => {
      iframeCurrent?.removeEventListener('load', () => setIsIFrameLoaded(true));
    };
  }, [iframeCurrent]);

  return isIFrameLoaded;
};
