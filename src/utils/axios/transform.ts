import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosTransform, RequestOptions, Result } from "./interface";

export const transform: AxiosTransform = {

  /**
   * @description: 请求之前处理可在此处理config操作
   */
  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
    return config
  },

  /**
     * @description: 请求拦截器处理
     */
  requestInterceptors: (config: AxiosRequestConfig) => {
    // 请求之前处理config，可以在此进行token等操作
    return config;
  },

  /**
   * @description: 处理响应数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options;

    const { data } = res;

    const {code, result, message} = data;

    // 不进行任何处理，直接返回
    if (!isTransformRequestResult) {
      return res.data;
    }

    // 错误的时候返回
    if (!data) return undefined;

    return data
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: Error) => {
    console.log(error)
    return error
  }
}