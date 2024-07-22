import { rest } from 'msw';

import { getBuildEnvVar } from '~utils/env';

import preview from '../mocks/preview.json';

export const handlers = [
  rest.post(`${getBuildEnvVar('API_BASE_PATH')}/api/url/validate`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(preview.validate));
  }),
  rest.get(`${getBuildEnvVar('API_BASE_PATH')}/api/page/parse`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(preview.parse));
  }),
  rest.get(`${getBuildEnvVar('API_BASE_PATH')}/preview/0`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(preview.preview));
  }),
];
