import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { isFunction } from "../is";
import { AxiosCanceler } from "./cancel";
import { CreateAxiosOptions, RequestOptions, Result } from "./interface";
import { cloneDeep } from "lodash-es"

/**
 * @description: Axios封装
 */
export class VAxios {
  private axiosInstance: AxiosInstance;
  private createAxiosOptions: CreateAxiosOptions;

  constructor(createAxiosOptions: CreateAxiosOptions) {
    this.createAxiosOptions = createAxiosOptions;
    this.axiosInstance = axios.create(createAxiosOptions);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    const  { transform } = this.createAxiosOptions
    // 没有transform直接返回不设置拦截器
    if (!transform) return
    // 获取拦截器
    const {
      requestInterceptors, requestInterceptorsCatch,
      responseInterceptors, responseInterceptorsCatch
    } = transform

    const axiosCanceler = new AxiosCanceler();

    /**
     * @description: 请求拦截器封装
     * @param {AxiosRequestConfig} config
     */
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config;
      !ignoreCancelToken && axiosCanceler.addPending(config);
      if (requestInterceptors && isFunction(requestInterceptors)) config = requestInterceptors(config);
      return config
      // 请求拦截器错误捕获
    }, (requestInterceptorsCatch && isFunction(requestInterceptorsCatch))?requestInterceptorsCatch:undefined)

    /**
     * @description: 响应拦截器封装
     * @param {AxiosResponse} res
     */
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) res = responseInterceptors(res);
      return res;
      // 响应结果拦截器错误捕获
    }, (responseInterceptorsCatch && isFunction(responseInterceptorsCatch))?responseInterceptorsCatch:undefined)
  }

  /**
   * @description: 封装请求方法
   * @param {AxiosRequestConfig} config
   * @param {RequestOptions} options
   */
  request<T = any>(config: AxiosRequestConfig, options?:RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config)
    const { transform, requestOptions } = this.createAxiosOptions
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatch, transformRequestData } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) conf = beforeRequestHook(conf, opt);

    return new Promise((resolve, reject) => {
      this.axiosInstance
          .request<any, AxiosResponse<Result>>(conf)
          .then((res: AxiosResponse<Result>) => {
            if (transformRequestData && isFunction(transformRequestData) && res.constructor?.name !== 'Cancel') {
              const ret = transformRequestData(res, opt);
              return resolve(ret)
            }
            resolve((res as unknown) as Promise<T>);
          })
          .catch((e: Error) => {
            if (requestCatch && isFunction(requestCatch)) {
              reject(requestCatch(e));
              return;
            }
            reject(e);
          })
    })
  }
}