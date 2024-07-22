import { useMediaQuery } from '@mui/material';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { InputField } from '~components/fields/InputField/InputField';
import { RadioGroupField } from '~components/fields/RadioGroupField/RadioGroupField';
import { SwitchField } from '~components/fields/SwitchField/SwitchField';
import { Link } from '~components/Link';
import { useCreateApp } from '~hooks/create-app';

import { AlertWrapper, InputFieldWrapper, SaveButtonWrapper } from './styles';
import { useMixpanel } from 'react-mixpanel-browser';

type TProps = {
  onSubmit: () => void;
};

export const YouTubeForm = ({ onSubmit }: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { t } = useTranslation();
  const { youtube, setYouTube } = useCreateApp();
  const mixpanel = useMixpanel()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      splitChannel: youtube?.splitChannel || false,
      inputType: youtube?.inputType || 'channelUrl',
      apiKey: youtube?.apiKey || '',
      url: youtube?.url || '',
    },
  });
  const formErrors = Object.entries(errors).filter(([, { type }]) => type !== 'pattern');

  const onSubmit_ = ({
    url,
    inputType,
    apiKey,
    splitChannel,
  }: {
    url: string;
    inputType: 'channelUrl' | 'playlistUrl';
    apiKey: string;
    splitChannel: boolean;
  }) => {
    setYouTube((prev) => ({
      url: url || prev?.url || '',
      inputType: inputType || prev?.inputType || 'channelUrl',
      apiKey: apiKey || prev?.apiKey || '',
      splitChannel,
    }));
    onSubmit();
    mixpanel.track('Cr3EnterYoutubeAPI')
    mixpanel.track('Cr3ChoseYoutubeAPI')
    mixpanel.track('Cr3EnterYoutubeNameChannel')
    mixpanel.track('Cr3CheckYoutube')
    mixpanel.track('Cr3SaveYouTubeButton')
  };

  const handleReset = () => {
    setYouTube(null);
    reset();
    onSubmit();
  };

  return (
    <>
      {!!formErrors.length && (
        <AlertWrapper
          $isMobile={isMobile}
          color='error'
          text={`${t('create-app-error')}: ${Object.keys(errors).join(', ')}`}
        />
      )}
      <InputFieldWrapper $isMobile={isMobile}>
        <InputField
          label={t('youtube-api-key-label')}
          message={errors.apiKey?.message}
          padding={isMobile ? '10px 0 12px' : undefined}
          type={errors.apiKey?.type}
          placeholder='1023'
          {...register('apiKey', {
            required: t('youtube-api-key-message'),
          })}
        />
        <Link
          variant='subtitle2'
          target='_blank'
          href='https://support.appsgeyser.com/hc/en-us/articles/360014427519-How-to-get-API-key-for-YouTube-?_ga=2.87341400.1978348658.1704378186-1419781259.1704378182&_gl=1*1kt7gjn*_ga*MTQxOTc4MTI1OS4xNzA0Mzc4MTgy*_ga_WRFFFBGC4Z*MTcwNDQ3NjEyMC42LjEuMTcwNDQ3NzMxNS42MC4wLjA.'
        >
          {t('youtube-how-to-find-api-key')}
        </Link>
      </InputFieldWrapper>
      <InputFieldWrapper $isMobile={isMobile}>
        <RadioGroupField
          control={control as unknown as Control<FieldValues>}
          name='inputType'
          label={t('youtube-api-key-label')}
          message={errors.inputType?.message}
          type={errors.inputType?.type}
          padding={isMobile ? '10px 0 12px' : undefined}
          options={[
            { value: 'channelUrl', label: 'YouTube channel url' },
            { value: 'playlistUrl', label: 'YouTube playlist url' },
          ]}
        />
      </InputFieldWrapper>
      <InputFieldWrapper $isMobile={isMobile}>
        <InputField
          label={t('youtube-channel-url-label')}
          message={errors.url?.message}
          type={errors.url?.type}
          placeholder='https://'
          padding={isMobile ? '10px 0 12px' : undefined}
          {...register('url', {
            required: t('youtube-channel-url-message'),
            pattern: {
              value:
                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/,
              message: t('url-pattern-message'),
            },
          })}
        />
      </InputFieldWrapper>
      <InputFieldWrapper $isMobile={isMobile}>
        <SwitchField
          control={control as unknown as Control<FieldValues>}
          name='splitChannel'
          label={t('youtube-split-channel-label')}
          message={errors.splitChannel?.message}
          type={errors.splitChannel?.type}
        />
      </InputFieldWrapper>
      <SaveButtonWrapper $isMobile={isMobile} padding='10px 0 0'>
        {!!youtube && (
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
