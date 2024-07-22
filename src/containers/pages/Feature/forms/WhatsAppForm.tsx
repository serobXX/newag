import 'react-international-phone/style.css';

import { useMediaQuery } from '@mui/material';
import * as UserGeo from '@zma-lab/user-geolocation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { InputField } from '~components/fields/InputField/InputField';
import { Label } from '~components/fields/InputField/styled';
import { useCreateApp } from '~hooks/create-app';

import { formatNumber } from '../utils';
import {
  AlertWrapper,
  FormText,
  InputFieldWrapper,
  SaveButtonWrapper,
  StyledPhoneInput,
} from './styles';
import { useMixpanel } from 'react-mixpanel-browser';

type TProps = {
  onSubmit: () => void;
};

export const WhatsAppForm = ({ onSubmit }: TProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { whatsApp, setWhatsApp } = useCreateApp();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: whatsApp?.number || '',
      message: whatsApp?.message || '',
      buttonText: whatsApp?.buttonText || 'Contact Us',
    },
  });
  const [phoneNumber, setPhoneNumber] = useState(whatsApp?.number || '');
  const mixpanel = useMixpanel()

  const formErrors = Object.entries(errors).filter(([, { type }]) => type !== 'pattern');

  const handleOnChangeNumber = (number: string) => {
    setValue('number', number);
    setPhoneNumber(number);
  };

  const onSubmit_ = ({
    number,
    message,
    buttonText,
  }: {
    number: string;
    message: string;
    buttonText: string;
  }) => {
    setWhatsApp((prev) => ({
      number: (number && formatNumber(number)) || prev?.number || '',
      message: message || prev?.message || '',
      buttonText: buttonText || prev?.buttonText || '',
    }));
    onSubmit();
    mixpanel.track('Cr3EnterPhone')
    mixpanel.track('Cr3WelcomeMessage')
    mixpanel.track('Cr3ButtonText')
    mixpanel.track('Cr3SaveWAButton')
  };

  const handleReset = () => {
    setWhatsApp(null);
    reset();
    onSubmit();
  };

  return (
    <>
      <FormText Component='h3' variant='m-400' color='middleGrey' $isMobile={isMobile}>
        {t('whats-app-form-text')}
      </FormText>
      {!!formErrors.length && (
        <AlertWrapper
          $isMobile={isMobile}
          color='error'
          text={`${t('create-app-error')}: ${Object.keys(errors).join(', ')}`}
        />
      )}
      <Label variant='m-500'>{t('whats-app-number')}</Label>
      <StyledPhoneInput
        {...register('number', {
          required: t('whats-app-number-message'),
        })}
        defaultCountry={UserGeo.getCountryCode()?.toLowerCase()}
        value={phoneNumber}
        onChange={handleOnChangeNumber}
        style={{ width: '100%' }}
        placeholder='+'
        $isError={Boolean(errors.number?.message)}
      />
      <InputFieldWrapper $isMobile={isMobile}>
        <InputField
          label={t('whats-app-message-label')}
          message={errors.message?.message}
          type={errors.message?.type}
          padding={isMobile ? '10px 0 12px' : undefined}
          {...register('message', {
            required: t('whats-app-message-message'),
          })}
        />
      </InputFieldWrapper>
      <InputFieldWrapper $isMobile={isMobile}>
        <InputField
          label={t('whats-app-button-text-label')}
          message={errors.buttonText?.message}
          type={errors.buttonText?.type}
          padding={isMobile ? '10px 0 12px' : undefined}
          {...register('buttonText', {
            required: t('whats-app-button-text-message'),
          })}
        />
      </InputFieldWrapper>
      <SaveButtonWrapper $isMobile={isMobile}>
        {!!whatsApp && (
          <Button
            onClick={handleReset}
            width={isMobile ? '100%' : 250}
            variant='quaternary'
            backgroundColor='transparent'
            color='supportiveDodoria10'
          >
            {t('delete')}
          </Button>
        )}
        <Button onClick={handleSubmit(onSubmit_)} width={isMobile ? '100%' : 250}>
          {t('save')}
        </Button>
      </SaveButtonWrapper>
    </>
  );
};
