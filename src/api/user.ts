import http from '/@/utils/axios';

enum Api {
  login = '/login'
}

export function login(data: any) {
  return http.request({
    url: Api.login,
    method: 'POST',
    data: data
  }, {
    isTransformRequestResult: false
  })
}