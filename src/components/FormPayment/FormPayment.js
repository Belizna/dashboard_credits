import React  from "react"
import {Form, Input, Button} from "antd"
import moment from "moment"
import { useDispatch } from 'react-redux';
import { editPayment } from '../../redux/action/payment';
const FormPayment = ({update}) => {

    let dispatch = useDispatch()

    const onFinish = (values) => {
        const value = {
            credit_name : update.credit_name,
            date : moment(values['date'], 'DD.MM.YYYY').format('YYYY-MM-DD'),
            summ: values['summ'],
            status: update.status
        }
        dispatch(editPayment(update, value))
    }

    return (
        <Form labelCol={{ span: 11 }}
                        wrapperCol={{ span: 7 }}
                        onFinish={onFinish}
                    >
                    <Form.Item name={['date']} label="Дата платежа">
                    <Input/>
                    </Form.Item>

                    <Form.Item name={['summ']} label="Сумма платежа">
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                            Изменить
                     </Button>
        </Form>
    )
}

export default FormPayment