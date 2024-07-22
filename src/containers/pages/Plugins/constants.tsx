import { AppReviewIcon } from '~assets/icons/plugins/AppReview';
import { BuyIcon } from '~assets/icons/plugins/Buy';
import { FaceIdIcon } from '~assets/icons/plugins/FaceId';
import { FireBaseIcon } from '~assets/icons/plugins/FireBase';
import { OneSignalIcon } from '~assets/icons/plugins/OneSignal';
import { QRCodeIcon } from '~assets/icons/plugins/QRCode';
import { SocialLoginwIcon } from '~assets/icons/plugins/SocialLogin';
import { TPlugin } from '~types/plugins';

export const FeaturesList: TPlugin[] = [
  {
    id: 1,
    text: 'One signal',
    icon: <OneSignalIcon />,
    value: 'Engagement',
    pervalue: '+20%',
    price: 'Free',
    description:
      'Our most popular push notification service offers advanced messaging and fits businesses of all sizes, and is free to test before publishing. Opt for Full-Service, and we’ll configure it for your app.',
    oneSignalAppId: '',
    mixpanelValue: "Cr4OneSignalWindow",
  },
  {
    id: 2,
    text: 'Firebase',
    icon: <FireBaseIcon />,
    value: 'Development',
    pervalue: '+35%',
    price: '$200',
    mixpanelValue: "Cr4FireBaseButton",
    description:
      "Firebase offers a wide range of tools and services that help developers build high-quality applications, improve their quality, and increase their user base."
  },
  {
    id: 3,
    text: 'Social login',
    icon: <SocialLoginwIcon />,
    value: 'User Experience',
    pervalue: '+41%',
    price: '$500',
    mixpanelValue: "Cr4SocialLoginButton",
    description:
      'Social login, or social sign-in, allows users to access websites and applications using their existing social media accounts, such as Facebook, Google, Twitter, or LinkedIn, instead of creating a new account specifically for the website.',
  },
  {
    id: 4,
    text: 'QR Scanner',
    icon: <QRCodeIcon />,
    value: 'User Experience',
    pervalue: '+27%',
    price: '$1,000',
    mixpanelValue: "Cr4QRButton",
    description:
      'A QR (Quick Response) scanner integrated into an application serves multiple purposes and offers a range of benefits for both users and developers.',
  },
  {
    id: 5,
    text: 'Face ID/Touch ID',
    icon: <FaceIdIcon />,
    value: 'User Experience',
    pervalue: '+39%',
    price: '$1,000',
    mixpanelValue: "Cr4FaceIdButton",
    description:
      'Face ID and Touch ID are biometric authentication methods used to enhance the security and convenience for application users.',
  },
  {
    id: 6,
    text: 'In-App Purchases',
    icon: <BuyIcon />,
    value: 'Increase revenue',
    pervalue: '+89%',
    price: '5$/per 1',
    mixpanelValue: "Cr4InAppPurchaseButton",
    description:
      'In-app purchases (IAP) are a key feature for applications, offering a range of benefits and opportunities for both developers and users.',
  },
  {
    id: 7,
    text: 'App Review',
    icon: <AppReviewIcon />,
    value: 'Increase download',
    pervalue: '+31%',
    price: '10$ per 1',
    mixpanelValue: "Cr4InAppReviewButton",
    description:
      "App reviews in application stores significantly impact various aspects of an app's lifecycle and perception among potential users"
  },
];
