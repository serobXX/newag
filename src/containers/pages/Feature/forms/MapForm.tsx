import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { InputField } from '~components/fields/InputField/InputField';
import { Typography } from '~components/index';
import { Link } from '~components/Link';
import { TMap, useCreateApp } from '~hooks/create-app';

import {
  AlertWrapper,
  DescriptionWrapper,
  FormText,
  InputFieldWrapper,
  SaveButtonWrapper,
} from './styles';

type TProps = {
  onSubmit: () => void;
};

export const MapForm = ({ onSubmit }: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { t } = useTranslation();
  const { map, setMap } = useCreateApp();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      html: map?.html || '',
    },
  });
  const formErrors = Object.entries(errors).filter(([, { type }]) => type !== 'pattern');

  const description = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6].map((value) => (
        <Typography key={`step_${value}`} variant='m-400' color='middleGrey'>
          {t(`map-form-description-step-${value}` as 'map-form-description-step-1')}
        </Typography>
      )),
    [t],
  );

  const onSubmit_ = ({ html }: TMap) => {
    setMap((prev) => ({
      html: html || prev?.html || '',
    }));
    onSubmit();
  };

  const handleReset = () => {
    setMap(null);
    reset();
    onSubmit();
  };

  return (
    <>
      <FormText Component='h3' variant='m-400' color='middleGrey' $isMobile={isMobile}>
        {t('map-form-text')}
      </FormText>

      {!!formErrors.length && (
        <AlertWrapper
          $isMobile={isMobile}
          color='error'
          text={`${t('create-app-error')}: ${Object.keys(errors).join(', ')}`}
        />
      )}
      <DescriptionWrapper $isMobile={isMobile}>{description}</DescriptionWrapper>
      <InputFieldWrapper $isMobile={isMobile}>
        <InputField
          label={t('map-url-label')}
          message={errors.html?.message}
          type={errors.html?.type}
          placeholder='https://'
          padding={isMobile ? '10px 0 12px' : undefined}
          {...register('html', {
            required: t('map-url-message'),
            pattern: {
              value:
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/,
              message: t('url-pattern-message'),
            },
          })}
        />
        <Link
          variant='subtitle2'
          target='_blank'
          href='https://support.appsgeyser.com/hc/en-us/articles/6380698045586?_ga=2.12566260.1978348658.1704378186-1419781259.1704378182&_gl=1*1e5gmit*_ga*MTQxOTc4MTI1OS4xNzA0Mzc4MTgy*_ga_WRFFFBGC4Z*MTcwNDUwMjA3My44LjEuMTcwNDUwNDIwOC4yNC4wLjA.'
        >
          {t('map-how-to-get-html')}
        </Link>
      </InputFieldWrapper>
      <SaveButtonWrapper $isMobile={isMobile} padding='10px 0 0'>
        {!!map && (
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
