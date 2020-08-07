import axios from 'axios'
import qs from 'qs'
function Factory({
  baseURL
}, callFail) {
  const $http = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 240 * 1000
  })

  $http.interceptors.request.use(config => {
    const headers = {}
    config.headers = {
      ...config.headers,
      ...headers
    }
    if (config.data && config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded' && config.data.constructor !== FormData) {
      // 判断config.data.constructor不是formdata，则不qs格式化data
      config.data = qs.stringify(config.data, {
        arrayFormat: 'repeat'
      }) // 数组需要格式化一下，格式化模式有三种：indices、brackets、repeat
    }
    return config
  }, error => {
    alert('未知错误，请重新尝试！')
    return Promise.reject(error)
  })

  $http.interceptors.response.use(response => {
    // 获取失败方针
    if (callFail(response.data)) {
      const errMsg = response.data.errMsg ||
        response.data.resultMsg || '未知错误，请重新尝试！'
      // alert(errMsg)
      return Promise.reject(errMsg)
    }
    return response.data
  }, error => {
    alert('未知错误，请重新尝试！')
    return Promise.reject(error)
  })
  return $http
}
export default Factory
