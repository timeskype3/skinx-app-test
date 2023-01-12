import React from "react";

import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export interface LoginDataType {
  username: string,
  password: string,
}

interface LoginProps {
  onLogin(data: LoginDataType): void,
  loading?: boolean,
}

const Login: React.FC<LoginProps> = (props) => {

  const handelFinishLogin = (data: LoginDataType) => {
    props.onLogin(data);
  }

  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={handelFinishLogin}
      disabled={props.loading}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={props.loading}
          disabled={false}
          style={{ width: '100%' }}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}
export default Login;