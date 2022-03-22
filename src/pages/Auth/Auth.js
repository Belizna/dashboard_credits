import React from "react"
import "./auth.css"
import { Form, Input , Button} from "antd";
import { useDispatch } from "react-redux";
import {loadUser} from "../../redux/action/user"



const Auth = () => {

  const dispatch = useDispatch()
  const onFinish = (values) => {
      const value = {
        'name' : "name",
        'email' : values["email"],
        'password' : values["password"]
      }

      dispatch(loadUser(value))
  }

    return (
        <div className="form">
        <div className="form_auth">
          <h2>Войти в аккаунт</h2>
          <p>Пожалуйста, войдите в свой аккаунт</p>
          <Form onFinish={onFinish} className="login-form">
          <Form.Item name={['email']}>
        <Input placeholder="Email"/>
          </Form.Item>
            <Form.Item name={['password']}>
              <Input.Password placeholder="Пароль"/>
            </Form.Item>
            <Form.Item>
      <Button type="primary" htmlType="submit">
          Войти в аккаунт
        </Button>
            </Form.Item>
          </Form>
      </div>
      </div>
    )
}

export default Auth;