import { extend } from 'umi-request';
import { message } from 'antd';
import { history } from 'umi';

// 错误码对应消息
const codeMessage: Record<number, string> = {
  200: '请求成功',
  201: '资源已创建',
  400: '请求错误',
  401: '密码不正确',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器错误',
}

// 错误处理器
const errorHandler = (error: any) => {
  const { response } = error
  if (response && response.status) {
    if (response.status == 401) {
      localStorage.clear();
      history.push('/login?redirect=' + encodeURIComponent(location.pathname));
    } else {
      const errorText = codeMessage[response.status] || response.statusText
      const { status, url } = response
      message.error(`${errorText}`)
    }
  } else if (!response) {
    message.error('网络异常，无法连接服务器')
  }
  return Promise.reject(error)
}

// 创建 request 实例
const request = extend({
  prefix: '', // 接口前缀
  timeout: 10000,
  credentials: 'include', // 自动携带 cookie
  errorHandler,
})

// 请求拦截器
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      url,
      options: {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  }
  return { url, options }
})

// 响应拦截器
request.interceptors.response.use(async (response) => {
  const data = await response.clone().json()
  if (data?.code !== 0 && data?.msg) {
    message.error(data.msg)
  }
  return response
})

export default request;
