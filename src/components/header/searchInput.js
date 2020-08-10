import React, { useState, useEffect } from "react";
import { Form, Input, AutoComplete, Layout, Button, Row, Modal, Drawer, List, message } from 'antd';
import { SearchOutlined, FormOutlined } from '@ant-design/icons';
import $http from '../../api'
import './searchInput.css'

import { setUserHandle, getuserIsSuggest } from '../../utils'
const logoSvg = require("../../logo.svg")


const { Header } = Layout;

function SearchInput(props) {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [disableBtn, setDisable] = useState(false)
  const [form] = Form.useForm()
  const [data, setData] = useState([])

  const onFinish = values => {
    console.log('Received values of form: ', values);
    $http.setUserSuggest(values).then(res => {
      if (res.code === 200) {
        message.success('谢谢您的宝贵建议，我们会及时修改及更新。')
        setDisable(true)
        setUserHandle(values)
        isShowModel()
        getList()
      }
    })
  }
  const getList = () => {
    $http.getUserSuggest().then(res => {
      if (res.code === 200) {
        setData(res.data)
      }
    })
  }
  useEffect(() => {
    let userSuggest = getuserIsSuggest('userIsSuggest')
    console.log('userSuggest', userSuggest)
    if (JSON.stringify(userSuggest) === '{}') {
      setDisable(false)
    } else {
      setDisable(true)
    }
    $http.getUserSuggest().then(res => {
      if (res.code === 200) {
        setData(res.data)
      }
    })
  }, [])
  const isShowDrawer = () => {
    setDrawerVisible(!drawerVisible)
  }
  const isShowModel = () => {
    setVisible(!visible)
  }
  const Tosearch = () => {
    window.open(`https://www.baidu.com/s?wd=${value}`)
  }
  const onSelect = data => {
    window.open(`https://www.baidu.com/s?wd=${data}`)
  }
  function getOptions(str) {
    return new Promise((resolve, reject) => {
      $http.getOptions(str).then(res => {
        resolve(res)
      })
    })
  }
  var timeout = null
  function myoptions(str){
    if (str === '') {
      return
    }
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      getOptions(str).then(res => {
        let data = res.map(item => { return { value: item.q } })
        setOptions(!str ? [] : data);
      })
    }, 1000)
    
  }
  const inputChange = (data) => {
    setValue(data)
    console.log('data', value)
  }
  const filterPhone = (phone) => {
    let reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})")
    return phone.replace(reg, "$1****$3")
  }
  return (
    <Header>
      <div className="lm-search">
        <Row gutter={24} style={{width: '100%'}}>
          <div className="lm-input" style={{width: '500px'}}>
            <img width="50px" src={logoSvg} alt="logo" />
            <AutoComplete
              onSelect={onSelect}
              onSearch={myoptions}
              options={options}
              allowClear
              onChange={inputChange}
              value={value}
              placeholder="百度一下，你就知道！"
            />
            <Button style={{ marginLeft: '10px' }} onClick={Tosearch} type="primary" icon={<SearchOutlined />}>
              搜索
            </Button>
          </div>
          <div className="user-couple-back" >
            {/* <FormOutlined onClick={isShowDrawer} className="userClick" /> */}
            <Button type="link"
             onClick={isShowDrawer}
            icon = {<FormOutlined />}>
              用户反馈
            </Button>
          </div>
        </Row>
      </div>
      <Modal
        title="您对该网站的建议"
        visible={visible}
        footer={null}
        onCancel={isShowModel}
        >
        <div className="user-form">
          <Form
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              rules={[{pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'},{ required: true, message: '请输入您的手机号码' }]}
              label="手机号码："
              name="phone">
              <Input placeholder="请输入您的手机号码" />
            </Form.Item>
            <Form.Item label="您的建议：" name="suggest" rules={[{ required: true, message: '请输入您的建议' }]} >
              <Input.TextArea style={{resize:'none', height: '100px'}} placeholder="请填写您的建议，我们会尽快改进及更新。" />
            </Form.Item>
            <Form.Item label="" colon={false}>
              <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <Button type="primary" htmlType="submit">
                提交
              </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Drawer
        width={500}
        title="用户建议"
        placement="right"
        closable={false}
        onClose={isShowDrawer}
        visible={drawerVisible}
        footer={
        <div>
          <Button disabled={disableBtn} type="primary" onClick={isShowModel}>给作者提建议</Button>
        </div>}
      >
        <div>
          <List
            style={{height: '100%'}}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<span>{filterPhone(item.phone)}</span>}
                  description={item.suggest}
                />
              </List.Item>
            )}
          />
        </div>
      </Drawer>
    </Header>
  )
}
export default SearchInput