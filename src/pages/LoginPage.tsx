import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Card, Space, Typography, Image } from 'antd';
import Login, { LoginDataType } from "../component/Login";

import { useAppDispatch, useAppSelector } from "../store/hook/useTypedSelector";
import { login as userLogin } from '../store/slices/authSlice';
import { updateUser } from "../store/slices/userSlice";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticate && auth.data) {
      dispatch(updateUser(auth.data));
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticate])

  const handleLogin = async (data: LoginDataType) => {
    dispatch(userLogin(data));
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
          <Login
            loading={auth.loading}
            valid={auth.isAuthenticate !== null ? auth.isAuthenticate : true}
            onLogin={handleLogin}
          />
        </Card>
      </Space>
    </Row>
  )
}
export default LoginPage;