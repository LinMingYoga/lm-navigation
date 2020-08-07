import React, {useEffect, useState} from 'react';
import './index.css'
import $http from '../../api/index'
function NavLink() {
  // state
  const [links, setLinks] = useState([])
  // methods
  const getLinks = () =>{
    $http.getLinks().then(res => {
      let data = res.data
      let result = data.map(item => {
        // item.list.slice(0, 1)
        return {
          title: item.title,
          list: item.list.slice(1, item.list.length - 1)
        }
        // return item
       })
       console.log('result', result)
      setLinks(result)
    })
  }
  // 生命周期
  useEffect(() => {
    getLinks()
  }, [])
  const lis = links.map((item, index) => {
  return <li className="active" key={index}><span>{item.title}</span><div className="lm-navigation-con">{item.list.map((item, index) => {return <span key={index}><a href={item.href}>{item.title}</a></span>})}</div></li>
  })
  return (
    <div className="lm-navigation">
      <ul className="lm-navigation-header">
        {lis}
      </ul>
    </div>
  )
}
export default NavLink