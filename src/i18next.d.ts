import 'i18next';

import en from './i18n/en/en.json';
import { TPathsValues } from './routes/types';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en & TPathsValues;
    };
  }
}
