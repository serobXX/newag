import { ChangeEvent, SyntheticEvent, forwardRef, useId } from 'react';


import { StyledFormControl, StyledFormLabel, StyledCheckBoxGroup } from './styles';
import { Checkbox } from '~components/Checkbox';
import { FormControlLabel } from '~components/FormControlLabel';

export type CheckBoxGroupOption = { value: string; label: string };

export type TProps = {
  label?: string;
  name: string;
  options: CheckBoxGroupOption[];
  onChange: (event: SyntheticEvent) => void;
};

export const CheckBoxGroup = forwardRef<HTMLButtonElement, TProps>(
  ({ label, name, options, onChange }, ref) => {
    const id = useId();

    return (
      <StyledFormControl>
        {!!label && <StyledFormLabel id={id}>{label}</StyledFormLabel>}
        <StyledCheckBoxGroup
          ref={ref}
          aria-labelledby={id}
          name={name}
          onChange={onChange}

        >
          {options.map(({ value, label }) => (
            <FormControlLabel
              onChange={onChange}
              control={<Checkbox key={label} value={value} label={label} />} label={''} />
          ))}
        </StyledCheckBoxGroup>
      </StyledFormControl>
    );
  },
);

CheckBoxGroup.displayName = 'CheckBoxGroup';
