import { TPremiumResponse } from '~types/auth';

import { HttpClient } from '../http-client/http-client';

export class AuthClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public isAuth = () => {
    return this.httpClient.get<{ logged: number, visited_first: number | null }>('/login/isAuth/');
  };

  public getPremiumStatus = () => {
    return this.httpClient.get<TPremiumResponse>('/get_premium_status.php');
  };

  public getPremium = () => {
    return this.httpClient.get<string>('/get_premium.php');
  };
}
