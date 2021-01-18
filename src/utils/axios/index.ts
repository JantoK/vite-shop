import { VAxios } from "./axios";
import { transform } from './transform'

const axios = new VAxios({
  timeout: 15 * 1000,
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // 是否关闭重复请求的拦截，默认为false
    'ignoreCancelToken': false,
    // 拦截器配置项
    transform,
    // 配置项
    requestOptions: {
      // 需要对返回数据进行处理
      isTransformRequestResult: true,
      // 格式化提交参数时间
      formatDate: true,
      // 消息提示类型
      errorMessageMode: 'none'
    }
  }
});

export default axios;