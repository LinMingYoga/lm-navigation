import Factory from './axios'

export default Factory({
  baseURL: 'http://news.cctv.com/2019/07/gaiban/cmsdatainterface/'
}, d => !d)
