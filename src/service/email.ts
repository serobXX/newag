import { TSendPluginsEmailParams, TSendPluginsEmailResponse } from '~types/email';

import { HttpClient } from '../http-client/http-client';

export class EmailClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public sendPluginsEmail = ({ email, plugins }: TSendPluginsEmailParams) => {
    return this.httpClient.get<TSendPluginsEmailResponse>(
      `/send_plugins_email.php?email=${encodeURIComponent(email)}${plugins.map(
        (plugin) => `&plugins[]=${encodeURIComponent(plugin)}`,
      )}`,
    );
  };
}
