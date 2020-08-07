import React, { useEffect, useState } from 'react';
import {
  List
} from 'antd';
import './news.css';
import $http from '../../api/index'
import { ZhihuOutlined } from '@ant-design/icons';


function SinaNews() {
  const [data, setData] = useState([])
  function getZhihu() {
    $http.getZhihu().then(res => {
      console.log('res', res)
      if (res.code === 200) {
        setData(res.data.list)
      }
    })
  }

  useEffect(() => {
    getZhihu()
  },[])

  return (
    <div className="sina">
      <List
        header={<div><ZhihuOutlined />乎热榜</div>}
        bordered
        dataSource = {data}
        renderItem={item => (
          <div>
            < List.Item > {
                /* eslint-disable-next-line react/jsx-no-target-blank */ }
                <a target="_blank" href={ item.link } > {item.title} </a></List.Item>
          </div>
        )}
      />
    </div>
  )
}

export default SinaNews