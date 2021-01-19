import { VAxios } from "./axios";
import { transform } from './transform'

const axios = new VAxios({
  timeout: 15 * 1000,
  headers: { 
    'Content-Type': 'application/json;charset=UTF-8',
    // 是否关闭重复请求的拦截，默认为false
    'ignoreCancelToken': false,
  },
  // 拦截器配置项
  transform,
  // 配置项
  requestOptions: {
    // 需要对返回数据进行处理
    isTransformRequestResult: false,
    // 格式化提交参数时间
    formatDate: true,
    // 消息提示类型
    errorMessageMode: 'none',
    // url
    apiUrl: 'http://mock.51y.cc:81/mock/6000f462151bfc02d3ba69cf/api',
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
  }
});

export default axios;