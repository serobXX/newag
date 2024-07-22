const buildEnvVars = {
  API_REQUEST_TIMEOUT: process.env['API_REQUEST_TIMEOUT'],
  BASE_PATH: process.env['BASE_PATH'],
  API_BASE_PATH: process.env['API_BASE_PATH'],
  SEND_EMAIL_FOR_UNAUTHORIZED_USER: process.env['SEND_EMAIL_FOR_UNAUTHORIZED_USER'],
  ANALYTICS_PATH: process.env['ANALYTICS_PATH'],
  MIXPANEL_TOKEN: process.env['MIXPANEL_TOKEN'],
  DEV_STRIPE: process.env['DEV_STRIPE'],
  PROD_STRIPE: process.env['PROD_STRIPE'],
  STRIPE_PUBLIC: process.env['STRIPE_PUBLIC'],
  STRIPE_PUBLIC_TEST: process.env['STRIPE_PUBLIC_TEST'],
  STRIPE_SECRET_TEST: process.env['STRIPE_SECRET_TEST'],
  PLAN_ID: process.env['PLAN_ID'],
  STRIPE_SECRET: process.env['STRIPE_SECRET']
};

export const getBuildEnvVar = (envName: keyof typeof buildEnvVars): string => {
  return buildEnvVars[envName] as string;
};
