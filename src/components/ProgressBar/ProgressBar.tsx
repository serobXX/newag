import { CSSProperties, useMemo } from 'react';
import { useTheme } from 'styled-components';

import { Colors } from '~types/colors';

import { Container, Label } from './styles';

type TProps = {
  value: number;
  xp?: number;
  backgroundColor?: Colors;
  totalXp?: number
};

export const ProgressBar = ({ xp = 0, value = 0, totalXp = 0, backgroundColor = 'lightSilver' }: TProps) => {
  const theme = useTheme();

  const fillerStyles: CSSProperties = useMemo(
    () => ({
      height: '100%',
      width: `${value}%`,
      backgroundColor: theme.colors.supportive,
      borderRadius: 'inherit',
      textAlign: 'right',
      display: 'flex',
      alignItems: 'center',
      justifyContent: value === 0 ? 'flex-start' : 'flex-end',
    }),
    [theme.colors, value],
  );

  return (
    <Container $backgroundColor={backgroundColor}>
      <div style={fillerStyles}>
        <Label> {
          xp ?
            `XP${xp}/${totalXp}` :
            `${value}%`
        }</Label>
      </div>
    </Container>
  );
};
