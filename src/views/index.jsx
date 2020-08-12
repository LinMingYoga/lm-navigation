import React, {useEffect, useState} from "react";
import "antd/dist/antd.css"
import "../App.css";
import "../assets/rest.css"
import { Layout } from 'antd'
import { Tabs } from "antd"
import localBackgroud from '../assets/images/bg.jpg'

// 引入API
import $http from '../api/index'
// 引入组件
import SearchInput from '../components/header/searchInput';
import Toutiao from '../components/news/toutiao';
import NavLink from '../components/navigation/index';
const { Content } = Layout;
const { TabPane } = Tabs;

function ToDoList () {

  const [backgroundImg, setBackgroundImg] = useState('')
  const [bgStyle, setBgStyle] = useState({})
  // const [poetry, setPoetry] = useState('')
  // const [poetryTitle, setPoetryTitle] = useState('')
  // const [poet, setPoet] = useState('')
  // function getBg() {
  //   return new Promise((resolve, reject) => {
  //     $http.getBg().then((res) => {
  //       resolve(res.data.url)
  //     });
  //   })
  // }
  // const setBg = () => {
    
  // }
  useEffect(() => {
    $http.getBg().then((res) => {
      setBackgroundImg(res);
      setBgStyle({
        width: "100%",
        backgroundImage: `url('${backgroundImg}')`,
      })
    }).catch(() => {
      setBgStyle({
        width: "100%",
        backgroundImage: `url('${localBackgroud}')`,
      });
    })
  },[backgroundImg])
  function callback(key) {
    console.log(key);
  }
  return (
    <div className="lm-page">
      <Layout>
        <SearchInput></SearchInput>
        <Content style={bgStyle} className="lm-content">
          <div className="w">
            <div className="lm-main spczCenter">
              <Tabs
                className="lm-tabs"
                defaultActiveKey="1"
                onChange={callback}
              >
                <TabPane tab="实时热门" key="1">
                  <div className="lm-news">
                    {/* <SinaNews></SinaNews> */}
                    <Toutiao></Toutiao>
                    {/* <Hotword></Hotword> */}
                  </div>
                </TabPane>
                <TabPane tab="常用" key="2">
                  <NavLink></NavLink>
                </TabPane>
                {/* <TabPane tab="Tab 3" key="3">
                  Content of Tab Pane 3
                </TabPane> */}
              </Tabs>
            </div>
          </div>
          {/* <Footer>
            <div className="footer-info">
              <Button
                className="github"
                type="link"
                onClick={toGithub}
                icon={<GithubOutlined />}
              >
                @LinMingYoga
              </Button>
            </div>
          </Footer> */}
        </Content>
      </Layout>
    </div>
  );
}

export default ToDoList;