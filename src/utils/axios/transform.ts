import { message } from "ant-design-vue";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { check } from "./check";
import { AxiosTransform, RequestOptions, Result } from "./interface";

/**
 * @description: 对拦截器等transform的封装
 */
export const transform: AxiosTransform = {

  /**
   * @description: 请求之前处理可在此处理config操作
   */
  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
    const { apiUrl } = options;

    // api处理
    config.url = `${apiUrl}${config.url}`

    return config;
  },

  /**
     * @description: 请求拦截器处理
     */
  requestInterceptors: (config: AxiosRequestConfig) => {
    return config;
  },

  /**
   * @description: 处理响应数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    // const { isTransformRequestResult } = options;

    if (res?.data) {
      const { data, code } = res.data;
      if ( code !== 200 ) { // 请求成功
        check(code, data?.msg || '请求错误!')
      }
    }

    return res.data || res || false
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: Error) => {
    return error
  }
}