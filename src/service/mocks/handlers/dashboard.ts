import { rest } from 'msw';

import { getBuildEnvVar } from '~utils/env';

import dashboard from '../mocks/dashboard.json';

export const handlers = [
  rest.get(`${getBuildEnvVar('API_BASE_PATH')}/dashboard/list`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(dashboard.list));
  }),
  rest.get(`${getBuildEnvVar('API_BASE_PATH')}/get_widget_data.php`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(dashboard.widgetData));
  }),
];
