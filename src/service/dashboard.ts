import { TAppItem } from '~hooks/dashboard';
import { TWidgetResponse } from '~types/dashboard';
import { oneSignalAppIdMapper, TSaveOneSignalAppIdParams } from '~utils/mappers';

import { HttpClient } from '../http-client/http-client';
export interface IappList {
  widgetsArray: TAppItem[]
  dashboardVisitedValue?: any
}
export interface IPayLink {
  paymentlink: string
}
export class DashboardClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getAppList = () => {
    return this.httpClient.get<IappList>('/dashboard/list');
  };

  public getGamification = (params: any) => {

    return this.httpClient.get<any>(`/dashboard/level`);

  };

  public postGamification = (params: any) => {
    return this.httpClient.post(`/dashboard/level`, {
      level: params.level,
      xp: params.xp,
      missions_completed: params.missions_completed
    });

  };

  public saveOneSignalAppId = (values: TSaveOneSignalAppIdParams) => {
    return this.httpClient.post<string, string>('/dashboard/push/', oneSignalAppIdMapper(values));
  };

  public getWidgetData = (widgetId: string) => {
    return this.httpClient.get<TWidgetResponse>('/get_widget_data.php', {
      queryParams: {
        widgetId,
      },
    });
  };

  public publishApp = (wid: string) => {

    return this.httpClient.get<IPayLink>(`/dashboard/publishApp?selectedWidgetId=${wid}`);

  };
}
