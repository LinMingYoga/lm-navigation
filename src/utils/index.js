/**
 * getUserInfo
 * 获取用户账户信息，如传入一个 key，则返回该 key 的值，反之返回所有
 *
 * @param key {string}
 * @returns {object}
 */
export function getuserIsSuggest(key) {
  let userInfo = window.localStorage.getItem('userIsSuggest')
  
  userInfo = userInfo ? JSON.parse(userInfo) : {}
  console.log('userInfo', userInfo)

  return key ? userInfo : userInfo
}

export function setUserHandle(value) {
  let data = JSON.stringify(value)
  window.localStorage.setItem('userIsSuggest', data)
}

export default {
  getuserIsSuggest
}