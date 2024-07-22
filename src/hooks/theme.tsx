import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { getStorageItem, setStorageItem } from '~utils/storage';

import { themes } from '../theme';
import { GlobalStyles } from '../theme/globalStyles';
import { Themes } from '../theme/types';

export type ThemeContextValues = {
  /** Theme value */
  theme: Themes;

  /** Callback that reseive new theme and apply it to whole document */
  changeTheme: (theme: Themes) => void;
};

const ThemeContext = createContext<ThemeContextValues>({
  theme: Themes.PRIMARY,
  changeTheme: () => null,
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(() => {
    const savedTheme = getStorageItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : Themes.PRIMARY;
  });

  const handleThemeChange = useCallback((theme: Themes) => {
    setTheme(theme);
    setStorageItem('theme', theme);
  }, []);

  const contextValues: ThemeContextValues = useMemo(
    () => ({ theme, changeTheme: handleThemeChange }),
    [handleThemeChange, theme],
  );

  const contextThemeValue = useMemo(() => themes[theme], [theme]);

  return (
    <ThemeContext.Provider value={contextValues}>
      <StyledThemeProvider theme={contextThemeValue}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValues => {
  const theme: ThemeContextValues = useContext(ThemeContext);
  return theme;
};
