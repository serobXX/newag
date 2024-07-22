import { ChangeEvent, forwardRef, useEffect, useId, useState } from 'react';
import { RadioButton } from '~components/RadioButton';
import { StyledFormControl, StyledFormLabel, StyledRadioGroup } from './styles';
import { Input } from '~components/Input/Input';

export type RadioGroupOption = { value: string; label: string; type?: string };

export type TProps = {
  label?: string;
  name: string;
  options: RadioGroupOption[];
  value: string | string[];
  onChange: (event: any, value: string, type?: string, answer?: string) => void;
};

export const RadioGroup = forwardRef<HTMLButtonElement, TProps>(
  ({ label, name, options, value, onChange }, ref) => {
    const id = useId();
    const [otherInputValue, setOtherInputValue] = useState('');

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
      const selectedOption = options.find(option => option.value === event.target.value);
      if (selectedOption?.type === 'other') {
        setOtherInputValue('');
      }
      onChange(event, event.target.value, selectedOption?.type);
    };

    const handleOtherInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setOtherInputValue(event.target.value)
      onChange(event, "other", "other", event.target.value)
      // if (onChangeOther) {
      //   onChangeOther(event.target.value, "other")
      // }
    };


    return (
      <StyledFormControl>
        {!!label && <StyledFormLabel id={id}>{label}</StyledFormLabel>}
        <StyledRadioGroup
          ref={ref}
          aria-labelledby={id}
          value={value}
          name={name}
          onChange={handleRadioChange}
        >
          {options.map(({ value: optionValue, label: optionLabel, type }) => (
            <div key={optionValue}>
              <RadioButton value={optionValue} label={optionLabel} />
              {type === 'other' && value === optionValue && (
                <Input value={otherInputValue} onChange={handleOtherInputChange} />
              )}
            </div>
          ))}
        </StyledRadioGroup>
      </StyledFormControl>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
