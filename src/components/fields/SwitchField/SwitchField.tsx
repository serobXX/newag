import { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';

import { Switch } from '~components/Switch';
import { Typography } from '~components/Typography/Typography';

import { Text, Wrapper } from './styled';

type TProps = Partial<ComponentProps<typeof Controller>> & {
  name: string;
  label: string;
  text?: string;
  message?: string;
  type?: string;
};

export const SwitchField = ({ name, label, text, message, type, control, ...props }: TProps) => (
  <>
    <Wrapper>
      {!!label && <Typography variant='m-500'>{label}</Typography>}
      <Controller
        {...props}
        control={control}
        name={name}
        render={({ field: { name, onChange, value } }) => (
          <Switch name={name} checked={value} onChange={(_, checked) => onChange(checked)} />
        )}
      />
    </Wrapper>
    {((!!message && type === 'pattern') || !!text) && (
      <Text
        variant='s-400'
        color={!!message && type === 'pattern' ? 'supportiveDodoria10' : 'trunks'}
      >
        {type === 'pattern' ? message : text}
      </Text>
    )}
  </>
);

SwitchField.displayName = 'SwitchField';
