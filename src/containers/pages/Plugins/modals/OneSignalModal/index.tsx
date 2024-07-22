import { useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { InputField } from '~components/fields/InputField/InputField';
import { Typography } from '~components/index';
import { Link } from '~components/Link';
import { Modal } from '~components/Modal';
import { useCreateApp } from '~hooks/create-app';

import { FeaturesList } from '../../constants';
import {
  AlertWrapper,
  Description,
  FormText,
  Header,
  InputFieldWrapper,
  SaveButtonWrapper,
} from './styles';
import { useMixpanel } from 'react-mixpanel-browser';

type TProps = { open: boolean; onClose: () => void };

export const OneSignalModal = ({ open, onClose }: TProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { t } = useTranslation();
  const { plugins, setPlugins } = useCreateApp();
  const mixpanel = useMixpanel()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oneSignalAppId: plugins?.['One signal']?.oneSignalAppId || '',
    },
  });

  const formErrors = Object.entries(errors).filter(([, { type }]) => type !== 'pattern');

  const onSubmit_ = async ({ oneSignalAppId }: { oneSignalAppId: string }) => {
    if (oneSignalAppId !== plugins?.['One signal']?.oneSignalAppId) {
      setPlugins((prev) => ({
        ...prev,
        [FeaturesList[0].text]: { ...FeaturesList[0], oneSignalAppId },
      }));
    }
    mixpanel.track('Cr4OneSignalAppId')
    mixpanel.track('Cr3SaveOneSignalButton')
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      width={608}
      padding={isMobile ? '0 8px 16px' : undefined}
      margin={isMobile ? '0' : undefined}
      titleSlotContent={
        <Header Component='h2' variant={isMobile ? 'large' : 'super-large'} $isMobile={isMobile}>
          {FeaturesList[0].text}
        </Header>
      }
    >
      <FormText Component='h3' variant='m-400' color='middleGrey' $isMobile={isMobile}>
        {t('create-one-signal_project')}
      </FormText>
      {!!formErrors.length && (
        <AlertWrapper
          $isMobile={isMobile}
          color='error'
          text={`${t('create-app-error')}: ${Object.keys(errors).join(', ')}`}
        />
      )}
      <Typography>{t('step1')}</Typography>
      <Description variant='m-400' color='middleGrey'>
        {`${t('visit')} `}
        <Link
          target='_blank'
          href='https://app.onesignal.com/apps?_ga=2.197006255.283845753.1706159925-1491030214.1705040781'
        >
          {t('one-signal-console')}
        </Link>
      </Description>
      <Typography>{t('step2')}</Typography>
      <Description variant='m-400' color='middleGrey'>
        {`${t('copy-one-signal-app')} `}
        <Link
          target='_blank'
          href='https://support.appsgeyser.com/hc/en-us/articles/5111329583506-Obtain-OneSignal-App-ID-to-set-up-Push-Notifications-in-your-app'
        >
          {t('obtain-one-signal')}
        </Link>
      </Description>
      <InputFieldWrapper $isMobile={isMobile}>
        <InputField
          label={t('one-signal-app-id')}
          padding={isMobile ? '10px 0 12px' : undefined}
          message={errors.oneSignalAppId?.message}
          type={errors.oneSignalAppId?.type}
          placeholder={t('one-signal-app-id')}
          {...register('oneSignalAppId', {
            required: t('one-signal-required-message'),
            pattern: {
              value:
                /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/,
              message: t('oneSignalId-pattern-message'),
            },
          })}
        />
      </InputFieldWrapper>
      <SaveButtonWrapper $isMobile={isMobile}>
        <Button onClick={handleSubmit(onSubmit_)} width={isMobile ? '100%' : 250}>
          {t('save')}
        </Button>
      </SaveButtonWrapper>
    </Modal>
  );
};
