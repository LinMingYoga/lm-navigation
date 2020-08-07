import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import $http from '../../api/index'
import './news.css';

function Hotword() {
  const [data,setData] = useState([])
  function getHotword() {
    $http.getHotWord().then(res => {
      console.log('res', res)
      if (res.code === 200) {
        setData(res.data.new)
      }
    })
  }

  useEffect(() => {
    getHotword()
  }, [])

  return (
    <div className = "sina" >
      < List
      header = {<div>刷屏热词</div>}
        bordered
        dataSource = {data}
        renderItem = {
          item => (
          <div>
            <List.Item> 
              {/* eslint-disable-next-line react/jsx-no-target-blank */} 
              <a target = "_blank" href={ item.link} >
                {item.title}
              </a>
            </List.Item >
            </div>
          )
        }
        />
    </div>
  )
}

export default Hotword