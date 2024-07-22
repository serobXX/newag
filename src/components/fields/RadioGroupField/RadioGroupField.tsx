import { RadioGroup } from '@mui/material';
import { ChangeEvent, ComponentProps } from 'react';
import { Controller } from 'react-hook-form';

import { RadioButton } from '~components/RadioButton';
import { RadioGroupOption } from '~components/RadioGroup';
import { Typography } from '~components/Typography/Typography';

import { Text, Wrapper } from './styled';

type TProps = Partial<ComponentProps<typeof Controller>> & {
  name: string;
  label: string;
  text?: string;
  message?: string;
  type?: string;
  padding?: string;
  options: RadioGroupOption[];
};

export const RadioGroupField = ({
  name,
  label,
  text,
  message,
  type,
  control,
  options,
  padding,
  ...props
}: TProps) => (
  <Wrapper padding={padding}>
    {!!label && <Typography variant='m-500'>{label}</Typography>}
    <Controller
      {...props}
      control={control}
      name={name}
      render={({ field: { name, onChange, value } }) => (
        <RadioGroup
          name={name}
          value={value}
          onChange={(_: ChangeEvent, value: string) => onChange(value)}
        >
          {options.map(({ value, label }) => (
            <RadioButton key={label} value={value} label={label} />
          ))}
        </RadioGroup>
      )}
    />
    {((!!message && type === 'pattern') || !!text) && (
      <Text
        variant='s-400'
        color={!!message && type === 'pattern' ? 'supportiveDodoria10' : 'trunks'}
      >
        {type === 'pattern' ? message : text}
      </Text>
    )}
  </Wrapper>
);

RadioGroupField.displayName = 'RadioGroupField';
