import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import type { FormProps } from 'antd';
import { postLogin, queryUserInfo } from '@/services/api';
import { history } from 'umi';

type FieldType = {
  username?: string;
  password?: string;
};


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    postLogin(values).then(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res));
      queryUserInfo().then(res => {
        history.push('/home')
      })
    })
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{ width: '600px', margin: '0 auto' }}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login;
