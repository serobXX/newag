import { rest } from 'msw';

import { getBuildEnvVar } from '~utils/env';

import auth from '../mocks/auth.json';

export const handlers = [
  rest.get(`${getBuildEnvVar('API_BASE_PATH')}/login/isAuth/`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(auth.isAuth));
  }),

  rest.get(`${getBuildEnvVar('API_BASE_PATH')}/get_premium_status.php`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(auth.premium));
  }),
];
