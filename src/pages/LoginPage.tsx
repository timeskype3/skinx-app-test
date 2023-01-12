import React from "react";
import { Row, Card, Space, Typography, Image } from 'antd';
import Login, { LoginDataType } from "../component/Login";

const { Title } = Typography;

const LoginPage: React.FC<any> = () => {
  const handleLogin = (data: LoginDataType) => {
    console.log('login', data)
  }

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{
        height: '100vh',
        background: '#282c34',
      }}>
      <Space direction="vertical" align="center" size="middle">
        <Image
          src="https://skinx.app/wp-content/themes/skinx/img/skinx-logo-white.svg"
          alt="Logo"
          preview={false}
        />
        <Card style={{ width: 400 }}>
          <Title>Login</Title>
          <Login onLogin={handleLogin} />
        </Card>
      </Space>
    </Row>
  )
}
export default LoginPage;