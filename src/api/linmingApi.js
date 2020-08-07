import Factory from './axios'

export default Factory({
  baseURL: 'http://localhost:5000/'
}, d => !d)
