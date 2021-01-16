import axios, { AxiosRequestConfig, Canceler } from "axios";

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, Canceler>();

//  将每一次请求转为字符串url判断是否唯一
export const getPendingUrl = (config: AxiosRequestConfig) => 
[config.method, config.url, config.data, config.params].join('&')

/**
 * @description: 封装axiosCanceler，用以当发起重复请求的时候进行中断
 */
export class AxiosCanceler {
  /**
   * @description: 添加Pending
   * @param {AxiosRequestConfig} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，则添加进去
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: 移除Pending
   * @param {AxiosRequestConfig} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
}