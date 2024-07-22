import { useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { InputField } from '~components/fields/InputField/InputField';
import { useCreateApp } from '~hooks/create-app';

import { AlertWrapper, FormText, InputFieldWrapper, SaveButtonWrapper } from './styles';
import { useMixpanel } from 'react-mixpanel-browser';

type TProps = {
  onSubmit: () => void;
};

export const FacebookForm = ({ onSubmit }: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { t } = useTranslation();
  const { facebook, setFacebook } = useCreateApp();
  const mixpanel = useMixpanel()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: facebook?.url || '',
    },
  });
  const formErrors = Object.entries(errors).filter(([, { type }]) => type !== 'pattern');

  const onSubmit_ = ({ url }: { url: string }) => {
    setFacebook((prev) => ({
      url: url || prev?.url || '',
    }));
    onSubmit();
    mixpanel.track('Cr3EnterFBUrl')
    mixpanel.track('Cr3SaveFBButton')

  };

  const handleReset = () => {
    setFacebook(null);
    reset();
    onSubmit();
  };

  return (
    <>
      <FormText Component='h3' variant='m-400' color='middleGrey' $isMobile={isMobile}>
        {t('facebook-form-text')}
      </FormText>
      {!!formErrors.length && (
        <AlertWrapper
          $isMobile={isMobile}
          color='error'
          text={`${t('create-app-error')}: ${Object.keys(errors).join(', ')}`}
        />
      )}
      <InputFieldWrapper $isMobile={isMobile}>
        <InputField
          label={t('facebook-url-label')}
          padding={isMobile ? '10px 0 12px' : undefined}
          message={errors.url?.message}
          type={errors.url?.type}
          placeholder='https://'
          {...register('url', {
            required: t('facebook-url-message'),
            pattern: {
              value:
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/,
              message: t('url-pattern-message'),
            },
          })}
        />
      </InputFieldWrapper>
      <SaveButtonWrapper $isMobile={isMobile}>
        {!!facebook && (
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
