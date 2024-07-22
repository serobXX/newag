import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpRequestOptions = {
  bearerToken?: string;
  abortSignal?: AbortSignal;
  queryParams?: Partial<{ [key: string]: string | number }>;
  headers?: Partial<{ [key: string]: string | number }>;
};

export class HttpClient {
  private axios: AxiosInstance;
  private apiBasePath: string;
  private requestTimeout: number;

  constructor(axios: AxiosInstance, apiBasePath: string, requestTimeout: number) {
    this.axios = axios;
    this.apiBasePath = apiBasePath;
    this.requestTimeout = requestTimeout;
  }

  private createRequestConfig = (options?: HttpRequestOptions) => {
    const requestConfig: AxiosRequestConfig = {
      baseURL: this.apiBasePath,
      signal: options?.abortSignal,
      params: options?.queryParams,
      timeout: this.requestTimeout,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...(options?.headers || {}) },
      withCredentials: true,
    };

    if (
      requestConfig.headers !== undefined &&
      options !== undefined &&
      options.bearerToken !== undefined
    ) {
      requestConfig.headers['Authorization'] = `Bearer ${options.bearerToken}`;
    }
    return requestConfig;
  };

  private transformResponse = <R>(response: AxiosResponse<R>) => {
    // Here you can put default transformation for every request response if it is needed
    return response?.data;
  };

  public get = async <R>(path: string, options?: HttpRequestOptions) => {
    const response = await this.axios.get<R>(path, this.createRequestConfig(options));
    return this.transformResponse<R>(response);
  };

  public getWithHeaders = async <R>(path: string, options?: HttpRequestOptions) => {
    const response = await this.axios.get<R>(path, this.createRequestConfig(options));
    return { data: this.transformResponse<R>(response), headers: response.headers };
  };
  public post = async <D, R>(path: string, data: D, options?: HttpRequestOptions) => {
    const response = await this.axios.post<R>(path, data, this.createRequestConfig(options));
    return this.transformResponse<R>(response);
  };
  public put = async <D, R>(path: string, data: D, options?: HttpRequestOptions) => {
    const response = await this.axios.post<R>(path, data, this.createRequestConfig(options));
    return this.transformResponse<R>(response);
  };
  public patch = async <D, R>(path: string, data: D, options?: HttpRequestOptions) => {
    const response = await this.axios.post<R>(path, data, this.createRequestConfig(options));
    return this.transformResponse<R>(response);
  };
  public delete = async <R>(path: string, options?: HttpRequestOptions) => {
    const response = await this.axios.post<R>(path, this.createRequestConfig(options));
    return this.transformResponse<R>(response);
  };
}
