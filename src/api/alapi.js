import Factory from './axios'

export default Factory({
  baseURL: 'https://v1.alapi.cn/api'
}, d => !d)
