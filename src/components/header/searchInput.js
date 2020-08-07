import React, { useState } from "react";
import { Form, Input, AutoComplete, Layout, Button, Row, Modal } from 'antd';
import { SearchOutlined, FormOutlined } from '@ant-design/icons';
import $http from '../../api'
import './searchInput.css'
const logoSvg = require("../../logo.svg")


const { Header } = Layout;

function SearchInput(props) {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm()

  const onFinish = values => {
    console.log('Received values of form: ', values);
  }
  const showModal = () => {
    setVisible(!visible)
  }
  // const handleOk = () => {
  //   setVisible(!visible)
  // }
  const handleCancel = () => {
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
            <FormOutlined onClick={showModal} className="userClick" />
          </div>
        </Row>
      </div>
      <Modal
        title="您对该网站的建议"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
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
    </Header>
  )
}
export default SearchInput