import { message } from "ant-design-vue";

const error = message.error;

export function check(status: number, msg: string): void {
  switch (status) {
    case 400:
      error(`${msg}`);
      break;
    case 404:
      error('网络请求错误,未找到该资源!');
      break;
    case 500:
      error('服务器错误,请联系管理员!');
      break;
    case 504:
      error('网络超时!');
      break;
    default:
      error(msg)
  }
}