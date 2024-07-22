import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getBuildEnvVar } from "~utils/env";


const axiosConfig: AxiosRequestConfig = {
  baseURL: getBuildEnvVar('ANALYTICS_PATH'),
};

const axiosInstance = axios.create(axiosConfig);


const { get, post, put, patch, delete: remove } = axiosInstance;

export { get, post, put, patch, remove };
