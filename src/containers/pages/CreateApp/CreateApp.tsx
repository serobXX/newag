import { useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Button from '~components/buttons/Button/Button';
import { InputField } from '~components/fields/InputField/InputField';
import { PageTitle } from '~components/PageTitle';
import { ProgressBar } from '~components/ProgressBar/ProgressBar';
import { PATHS } from '~constants/paths';
import { useGetWidgetData, useSaveOneSignalAppId } from '~hooks/api/dashboard';
import { useSendPluginsEmail } from '~hooks/api/email';
import { useCreateApp } from '~hooks/create-app';
import { useAuth, useEditWebsiteApp, useEditWebsiteAppTabs, useNameValidate } from '~hooks/index';
import { useTour } from '@reactour/tour';
import { BuildAppLayout } from '../../../containers/Layouts/BuildAppLayout/BuildAppLayout';
import { Pages } from '../../../containers/Layouts/BuildAppLayout/constants';
import { BuyPremiumModal } from '../../BuyPremiumModal';
import { ColorPaletteButtons } from '../Customization/constants';
import { AlertWrapper, FormWrapper, ProgressWrapper, SubmitButtonWrapper } from './styles';
import { useMixpanel } from 'react-mixpanel-browser';
import { CREATEMOBILESTEPS, CREATESTEPS } from '~constants/tourSteps/createSteps';
import { CUSTOMIZESTEPS } from '~constants/tourSteps/customizeSteps';
import { QuizModal } from '../../../containers/QuizModal/QuizModal';
import { useDashboard } from '~hooks/dashboard';
import { QuizList } from '../../../containers/QuizModal/constants';

const progressBarValue = 0;

export const CreateApp = () => {
  const theme = useTheme();
  const location = useLocation();
  const { isPremium } = useAuth();
  const {
    acid,
    plugins,
    actionBar,
    appLayoutView,
    url,
    email,
    appIcon,
    appName,
    colorTheme,
    multisubmitToken,
    setUrl,
    setAppName,
    setEmail,
  } = useCreateApp();
  const { isEnabledQuiz } = useDashboard()
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { url: url || 'https://', appName, email },
  });
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const navigate = useNavigate();
  const { isAuth, firstVisit } = useAuth();
  const nameValidateQuery = useNameValidate();
  const getWidgetData = useGetWidgetData();
  const editWebsiteApp = useEditWebsiteApp();
  const editWebsiteAppTabs = useEditWebsiteAppTabs();
  const sendPluginsEmail = useSendPluginsEmail();
  const saveOneSignalAppId = useSaveOneSignalAppId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mixpanel = useMixpanel()
  const { setIsOpen, setSteps, setCurrentStep, isOpen } = useTour()
  const [isOpenQuizModal, setOpenQuizModal] = useState(false);

  const isLoading =
    nameValidateQuery.isLoading ||
    getWidgetData.isLoading ||
    editWebsiteApp.isLoading ||
    editWebsiteAppTabs.isLoading ||
    sendPluginsEmail.isLoading ||
    saveOneSignalAppId.isLoading;
  const formErrors = Object.entries(errors).filter(([, { type }]) => type !== 'pattern');
  const widgetId = location.state?.widgetId as string;
  const formattedPlugins = Object.values(plugins)
    .filter((value) => !!value && !value.oneSignalAppId)
    .map((value) => value?.text ?? '');

  const handleAnalytics = () => {
    mixpanel.track('Cr1EnterEmail')
    mixpanel.track('Cr1EnterUrl')
    mixpanel.track('Cr1EnterName')
    mixpanel.track('Cr1ButtonNext')
  }

  const onSubmit = () => {

    handleAnalytics()
    handleModalClose();
    setIsOpen(false)
  };
  const openTour = () => {
    if (isAuth && firstVisit) {
      // @ts-ignore
      setSteps(isMobile ? CREATEMOBILESTEPS : CREATESTEPS);
      setIsOpen(true)
    }
  }

  const handleModalClose = async () => {
    const nameValidateResponse = await nameValidateQuery.mutateAsync(appName);
    setIsModalOpen(false);

    if (!nameValidateResponse) {
      setError('appName', {
        type: 'pattern',
        message: t('url-pattern-message'),
      });
    }

    if (nameValidateResponse) {
      if (widgetId) {
        if (isMobile) {
          navigate(`/${PATHS.YOUR_APPS}/${PATHS.EDIT}/${PATHS.CUSTOMIZATION}`, {
            relative: 'path',
            state: {
              widgetId,
            },
          });
        } else {
          await editWebsiteApp.mutateAsync({
            url,
            appIcon,
            name: `${appName}_${widgetId}`,
            appName,
            color: ColorPaletteButtons[colorTheme.id as keyof typeof ColorPaletteButtons],
            description: '',
            widgetId,
            multisubmitToken,
          });
          await editWebsiteAppTabs.mutateAsync({ actionBar, appLayoutView, acid });

          if (formattedPlugins.length) {
            await sendPluginsEmail.mutateAsync({ email, plugins: formattedPlugins });
          }

          if (plugins?.['One signal']?.oneSignalAppId) {
            await saveOneSignalAppId.mutateAsync({
              userOneSignalId: plugins['One signal'].oneSignalAppId,
              saveOneSignalId: '1',
            });
          }

          navigate(`/${PATHS.YOUR_APPS}?edit=1`, { relative: 'path', state: {} });
        }
      } else {
        navigate(`/${PATHS.CREATE_APP}/${PATHS.CUSTOMIZATION}`, {
          relative: 'path',
          state: {
            widgetId,
          },
        });
      }
    }
  };
  const handleCloseQuizModal = () => {
    setOpenQuizModal(false);
  };
  useEffect(() => {
    if (firstVisit && isAuth && isEnabledQuiz) {
      setOpenQuizModal(true)
    }
  }, [firstVisit, isEnabledQuiz])
  useEffect(() => {
    if (isOpenQuizModal) {
      setIsOpen(false)
    } else {
      openTour()
    }
  }, [isOpenQuizModal])

  console.log(isEnabledQuiz, firstVisit, isAuth);

  return (
    <>
      <QuizModal list={QuizList} open={isOpenQuizModal} onClose={handleCloseQuizModal} width={608} />
      <BuyPremiumModal open={isModalOpen} onClose={handleModalClose} />
      <BuildAppLayout currentScreen={Pages.GENERAL} step={1} progressBarValue={progressBarValue}>
        <PageTitle
          isMobile={isMobile}
          title={t(widgetId ? 'general' : 'create-app')}
          subtitle={!isMobile && !widgetId ? t('start-make') : undefined}
          isBeforeButton={false}
        />
        <FormWrapper>
          {!!formErrors.length && (
            <AlertWrapper
              color='error'
              text={`${t('create-app-error')}: ${Object.keys(errors).join(', ')}`}
            />
          )}
          <InputField
            className='first-step'
            label={t('url-label')}
            text={t('url-text')}
            message={errors.url?.message}
            type={errors.url?.type}
            placeholder='https://'
            {...register('url', {
              required: t('url-message'),
              pattern: {
                value:
                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/,
                message: t('url-pattern-message'),
              },
              onChange: (event) => setUrl(event.target.value),
            })}
          />
          <InputField
            className='second-step'
            label={t('app-name-label')}
            text={t('app-name-text')}
            message={errors.appName?.message}
            {...register('appName', {
              required: t('app-name-message'),
              onChange: (event) => setAppName(event.target.value),
            })}
          />
          <InputField
            className='third-step'
            label={t('email-label')}
            text={t('email-text')}
            message={errors.email?.message}
            disabled={!!widgetId}
            type={errors.email?.type}
            {...register('email', {
              required: t('email-message'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: t('email-pattern-message'),
              },
              onChange: (event) => setEmail(event.target.value),
            })}
          />
          {isMobile && !widgetId && (
            <ProgressWrapper>
              <ProgressBar value={progressBarValue} backgroundColor='background' />
            </ProgressWrapper>
          )}
          <SubmitButtonWrapper onClick={() => {
            setIsOpen(false)
            setCurrentStep(0)
            // @ts-ignore
            setSteps(CUSTOMIZESTEPS)
          }
          }>
            <Button className='fifth-step' loading={isLoading} onClick={handleSubmit(onSubmit)} width={250}>
              {t(widgetId && !isMobile ? 'save' : 'next-step')}
            </Button>
          </SubmitButtonWrapper>
        </FormWrapper>
      </BuildAppLayout>
    </>
  );
};

