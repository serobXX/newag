import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Button from '~components/buttons/Button/Button';
import { MainCard } from '~components/MainCard';
import { useAuth } from '~hooks/auth';

import { ControlsWrapper, PublishTextWrapper, Text } from '../styles';
import PublishStepper from './atoms/Tabs';
import { useState } from 'react';
import { Input } from '~components/Input/Input';
import { useDashboard } from '~hooks/dashboard';



export const SelfPublishCard = ({ }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const isTabletM = useMediaQuery(theme.breakpoints['--tablet-m']);
  const { isPremium } = useAuth();
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [prvUrl, setPrvUrl] = useState('')
  const [devName, setDevNmae] = useState('')
  const {
    appList,
    selectedApp,
    setSelectedApp
  } = useDashboard()

  const generatePrvUrl = () => {

    if (!selectedApp) {
      const url = `https://appsgeyser.com/privacy/app/custom/?package=com.w${appList[0]?.name}&developer=${devName}`
      setPrvUrl(url)
    } else {
      const selApp = appList.find((elm) => elm.wid == selectedApp)
      const url = `https://appsgeyser.com/privacy/app/custom/?package=com.w${selApp?.name}&developer=${devName}`
      setPrvUrl(url)
    }
  }

  const steps = [
    {
      title: 'Create Developer Account',
      details: [
        <span> <a href='https://play.google.com/console/signup'>Visit</a> the Google Play Developer Console signup page and follow our <a href='https://support.appsgeyser.com/hc/en-us/articles/360008508713-How-to-create-Google-Play-Developer-account'>guide</a></span>,
        'Fill in your account details',
        'Pay $25 registration fee',
        'Verify your identity',
        'Please note that it may take up to 48 hours for your registration to be fully processed',
      ],
      video: 'https://www.youtube.com/embed/AwrJVszGbEU',
    },
    {
      title: 'Create Your App',
      details: [
        'Click Create app button to start submitting your app to Google Play',
        'Enter your app details',
      ],
      video: 'https://www.youtube.com/embed/1ZBQ8qtXAJM',
    },
    {
      title: 'Create Your App',
      details: [
        'Accept all Declarations',
        'Click Create app button',
      ],
      video: 'https://www.youtube.com/embed/1ZBQ8qtXAJM',
    },
    {
      title: 'Set up your app',
      details: [
        'Skip testing',
        'Click View tasks in Set up your app section',
      ],
      video: 'https://www.youtube.com/embed/YghMCxLFtoY',
    },
    {
      title: 'Set up your app',
      details: [
        "You'll need to complete these tasks",
        'Click on Set privacy policy task',
      ],
      video: 'https://www.youtube.com/embed/uPYt8-Ixuvs',
    },
    {
      title: 'Set up your app',
      details: [
        <span>Enter your Developer Name in this field <br />
          <Input onChange={(e) => setDevNmae(e.target.value)} />
          <b>{prvUrl}</b> <br />
          <i onClick={generatePrvUrl} style={{ cursor: "pointer" }}>Generate privacy policy URL</i>
        </span>,
        'Go back to Dashboard',
      ],
      video: 'https://www.youtube.com/embed/j7JVi14f3nc',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on App access task',
        'Complete App access section',
        'Click Save',
        'Go back to Dashboard',
      ],
      video: 'https://www.youtube.com/embed/7tScOVHn2R4',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on Ads task',
        'Complete Ads section',
        'Click Save',
        'Go back to Dashboard',
      ],
      video: 'https://www.youtube.com/embed/cdj8NK2X2u8',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on Content rating task',
        'Сlick Start questionnaire button',
      ],
      video: 'https://www.youtube.com/embed/9t3Fr_vMIOM',
    },
    {
      title: 'Set up your app',
      details: [
        'Enter your email',
        'Сhoose your app category',
        "Сlick 'Next' button"
      ],
      video: 'https://www.youtube.com/embed/9t3Fr_vMIOM',
    },
    {
      title: 'Set up your app',
      details: [
        'Answer all questions',
        'Click Save',
        "Click Next",
        "Check the summary",
        'Click Submit',
        'Go back to Dashboard'
      ],
      video: 'https://www.youtube.com/embed/9t3Fr_vMIOM',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on Target audience and content task',
        'Complete Target audience and content section',
        "Your app's target audience must be 13+",
        'Click Next'
      ],
      video: 'https://www.youtube.com/embed/LR9GzgOY-Zw',
    },
    {
      title: 'Set up your app',
      details: [
        'Complete Store presence section',
        'Click Next',
        "Check the summary",
        'Click Save',
        'Go back to Dashboard'
      ],
      video: 'https://www.youtube.com/embed/LR9GzgOY-Zw',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on News apps taskn',
        'Complete News apps section',
        <span>
          Please note that if you choose Yes, then you would have to provide information to help
          Google Play verify your credentials as a news publisher and explain how you source the news content that is shown in your app,
          please check Google Play policy -<a href=' https://support.google.com/googleplay/android-developer/answer/9935326'> https://support.google.com/googleplay/android-developer/answer/9935326</a>
        </span>,
        'Click Save',
        'Go back to Dashboard'
      ],
      video: 'https://www.youtube.com/embed/hwoArD7j5Vk',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on Data safety task',
        'Click Import from CSV at the top right of the page',
        <span>
          Upload the following CSV file -<br />
          <a href='/data_safety_file.csv'>data_safety_all.csv</a>
        </span>,
        'Click Next at the bottom of the page 3 times to confirm all the information that was uploaded in CSV, then click Save and go back to Dashboard'
      ],
      video: 'https://www.youtube.com/embed/eZyMViR1qLI',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on Government apps task',
        'Select No',
        'Click Save and go back to Dashboard'
      ],
      video: 'https://www.youtube.com/embed/eZyMViR1qLI',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on Financial features task',
        "Scroll down and select My app doesn't provide any financial features if it doesn't. Otherwise, select an applicable option",
        'Click Save as draft and Next, then click Save on the Documentation page',
        'Go back to Dashboard'
      ],
      video: 'https://www.youtube.com/embed/eZyMViR1qLI',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on Select an app category and provide contact details task',
        "Click Edit in App category section, then select type and category of your app and click Save",
        "Сlick Edit in Store Listing contact details section, then enter your contact details. If you don't have a website, use this link - https://app18093468.appsgeyser.com/. Then click Save",
        'Click Dashboard at the sidebar'
      ],
      video: 'https://www.youtube.com/embed/Sgz5XE5uw44',
    },
    {
      title: 'Set up your app',
      details: [
        'Click on Set up your store listing task',
        "Enter short App description",
        "Enter full App description",
        'Upload icon',
        'Upload feature graphic',
        'Upload screenshots',
        'Click Save',
        "Сlick 'Dashboard' at the sidebar"
      ],
      video: 'https://www.youtube.com/embed/f96ub7bCQZ4',
    },
    {
      title: 'Upload Your AAB',
      details: [
        'Scroll down to Create and publish a release section',
        'Click View tasks in Create and publish a release section',
        "Click Select countries and regions task"
      ],
      video: 'https://www.youtube.com/embed/pqcQ2df4cu8',
    },
    {
      title: 'Upload Your AAB',
      details: [
        'Click Add countries / regions button',
        'Add countries / regions to Production',
        "Click Add countries / regions button to save changes"
      ],
      video: 'https://www.youtube.com/embed/pqcQ2df4cu8',
    },
    {
      title: 'Upload Your AAB',
      details: [
        'Click Create new release button'
      ],
      video: 'https://www.youtube.com/embed/S3bNAfvuU0I',
    },
    {
      title: 'Upload Your AAB',
      details: [
        'Click Choose signing key',
        'Select Use Google-generated key',
        'Click Upload button',
        'Upload your AAB file',
        'You will see that your file is uploaded'
      ],
      video: 'https://www.youtube.com/embed/S3bNAfvuU0I',
    },
    {
      title: 'Upload Your AAB',
      details: [
        'Change Release notes',
        'Click Save as draft'
      ],
      video: 'https://www.youtube.com/embed/S3bNAfvuU0I',
    },
    {
      title: 'Upload Your AAB',
      details: [
        'Click Next',
        'Click Save, then Go to Publishing overview'
      ],
      video: 'https://www.youtube.com/embed/S3bNAfvuU0I',
    },
    {
      title: 'Upload Your AAB',
      details: [
        'In the Publishing overview click Send 14 changes for review and then confirm it ',
        'App will go Live in the next 3-5 days'
      ],
      video: 'https://www.youtube.com/embed/S3bNAfvuU0I',
    },
    {
      title: 'Success',
      details: [
        'Enjoy your app'
      ],
      video: '',
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <MainCard
      header={t('self-publish')}
      controls={
        <ControlsWrapper $isTabletM={!isTabletM} $isMobile={isMobile}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            width={!isTabletM ? '100%' : 250}
            variant='secondary'
          >
            Back
          </Button>
          <Button
            disabled={activeStep === steps.length}
            width={!isTabletM ? '100%' : 250}
            onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </ControlsWrapper>
      }
      isMobile={isMobile}
    >
      <PublishStepper activeStep={activeStep} steps={steps} handleReset={handleReset} />
    </MainCard>
  );
};
