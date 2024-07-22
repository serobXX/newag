import { SnackbarProps } from '@mui/material';
import { RefObject, useEffect, useState } from 'react';

import { StyledSnackBar } from './styles';
import { debounce } from './utils';

export interface SnackbarPropsExtended extends SnackbarProps {
  horizontalMargin?: number;
  container: RefObject<HTMLDivElement>;
  offsetY?: number;
  timeout?: number;
}

export const Snackbar = ({
  offsetY,
  container,
  horizontalMargin,
  open,
  timeout = 2000,
  ...rest
}: SnackbarPropsExtended) => {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [isOpen, setOpen] = useState(open);

  useEffect(() => {
    if (container && !containerWidth) {
      setContainerWidth(container.current?.clientWidth as number);
    }
    const handleResize = debounce(
      () => setContainerWidth(container.current?.clientWidth as number),
      300,
    );
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [container, containerWidth]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isOpen) {
      timerId = setTimeout(() => setOpen(false), timeout);
    }

    return () => clearTimeout(timerId);
  }, [isOpen, timeout]);

  return (
    <StyledSnackBar
      {...rest}
      open={isOpen}
      container={container}
      width={containerWidth}
      $offsetY={offsetY}
      $horizontalMargin={horizontalMargin}
      sx={{ width: '100%', alignItems: 'flex-start', left: 0, right: 0 }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    />
  );
};
