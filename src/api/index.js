import alapi from './alapi'
import LM from './linmingApi'
export default {
  getZhihu: () => alapi.post('tophub/get', { type: 'zhihu' }),
  getWangyi: () => alapi.get('/new/toutiao?start=1&num=50'),
  getNews: data => LM.get(`/linming/api/getcctvnews?key=${data}`),
  getLinks: () => LM.get(`/api/users/getLinks`),
  getOptions: data => LM.get(`/linming/api/changeSeach?key=${data}`),
  getShichi: () => alapi.post(`/shici`, { type: 'all' }),
  getHotWord: () => alapi.get('/tophub/wiki'),
  getBg: () => alapi.post('/bing', { format: 'json' }),
  getUserSuggest: () => LM.get(`/linming/api/getSuggest`),
  setUserSuggest: data => LM.post(`/linming/api/userSuggest`, data),
}