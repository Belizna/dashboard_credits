import React from "react"
import {Form, Input, Button} from "antd"
import axios from "axios"

const FormPayment = ({update}) => {

    const onFinish = (values) => {
        const value = {
            'credit_name': update.credit_name,
            'date': values['date'],
            'summ': values['summ'],
            'status': update.status
        }
        axios.post(`https://backend-dashboard-credits.herokuapp.com/repayments/update/${update._id}`, value)
    }

    return (
        <Form labelCol={{ span: 11 }}
                        wrapperCol={{ span: 7 }}
                        onFinish={onFinish}
                    >
                    <Form.Item name={['date']}label="Дата платежа">
                    <Input />
                    </Form.Item>

                    <Form.Item name={['summ']} label="Сумма платежа">
                        <Input/>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                            Изменить
                     </Button>
        </Form>
    )
}

export default FormPayment