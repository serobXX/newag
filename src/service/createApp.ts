import {
  TNameValidateParams,
  TNameValidateResponse,
  TParseResponse,
  TUrlValidateParams,
  TUrlValidateResponse,
} from '~types/preview';
import {
  createAppMapper,
  editAppMapper,
  editAppTabsMapper,
  TCreateAppParams,
  TEditAppParams,
  TEditAppTabsParams,
  validateMapper,
} from '~utils/mappers';

import { HttpClient } from '../http-client/http-client';

export class CreateAppClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public urlValidate = ({ url, YII_CSRF_TOKEN }: TUrlValidateParams) => {
    return this.httpClient.post<string, TUrlValidateResponse>(
      '/api/url/validate/',
      validateMapper({
        url,
        YII_CSRF_TOKEN,
      }),
    );
  };

  public nameValidate = ({ name }: TNameValidateParams) => {
    return this.httpClient.get<TNameValidateResponse>(
      `/is_valid_name.php?name=${encodeURIComponent(name)}`,
    );
  };

  public getEmpty = () => {
    return this.httpClient.get('/api/templateTabs/getEmpty/');
  };

  public parse = (url: string, bearerToken: string, abortSignal?: AbortSignal) => {
    return this.httpClient.get<TParseResponse>(
      `/api/page/parse/?url=${encodeURIComponent(url)}&allowEmpty=1`,
      {
        abortSignal,
        bearerToken,
      },
    );
  };

  public urlWithTabs = ({
    url,
    whatsApp,
    facebook,
    twitter,
    youtube,
    blog,
    map,
    appLayoutView,
    actionBar,
    color,
    appIcon,
    appName,
    email,
  }: TCreateAppParams) => {
    return this.httpClient.post(
      '/widget-preview/urlWithTabs/',
      createAppMapper({
        url,
        whatsApp,
        facebook,
        twitter,
        youtube,
        blog,
        map,
        appLayoutView,
        actionBar,
        color,
        appIcon,
        appName,
        email,
      }),
    );
  };

  public createWebsiteApp = ({
    url,
    whatsApp,
    facebook,
    twitter,
    youtube,
    blog,
    map,
    appLayoutView,
    actionBar,
    color,
    appIcon,
    appName,
    email,
    quiz
  }: TCreateAppParams) => {
    return this.httpClient.post(
      '/create-website-app/',
      createAppMapper({
        url,
        whatsApp,
        facebook,
        twitter,
        youtube,
        blog,
        map,
        appLayoutView,
        actionBar,
        color,
        appIcon,
        appName,
        email,
        quiz
      }),
    );
  };

  public editWebsiteApp = ({
    url,
    name,
    description,
    color,
    appIcon,
    appName,
    widgetId,
    multisubmitToken,
  }: TEditAppParams) => {
    return this.httpClient.post(
      '/dashboard/edit/',
      editAppMapper({
        url,
        name,
        description,
        color,
        appIcon,
        appName,
        widgetId,
        multisubmitToken,
      }),
    );
  };

  public editWebsiteAppTabs = ({ appLayoutView, actionBar, acid }: TEditAppTabsParams) => {
    return this.httpClient.post(
      '/dashboard/edit/tabs/',
      editAppTabsMapper({
        appLayoutView,
        actionBar,
        acid,
      }),
    );
  };
}
