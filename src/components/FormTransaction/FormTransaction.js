import React from "react"
import { Form, Input, Button, DatePicker } from 'antd';
import axios from "axios";



const FormTransaction = ({record}) => {

    const onFinish = (values) => {
        const value = {
            'credit_name': record,
            'date': values['date'].format('YYYY-MM-DD'),
            'summ' : values['summ']
        }
        axios.post('https://backend-dashboard-credits.herokuapp.com/transaction/add', value)
      };

    return(
        <div>
        <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
        >
            <Form.Item name={['date']} label="Дата">
        <DatePicker />
      </Form.Item>
      <Form.Item name={['summ']} label="Сумма">
        <Input />
      </Form.Item>
        <Button type="primary" htmlType="submit">Добавить</Button>
    </Form>
        </div>
    )
}


export default FormTransaction
