import Factory from './axios'

export default Factory({
  // baseURL: window.origin
  baseURL: 'http://localhost:5000'
}, d => !d)
