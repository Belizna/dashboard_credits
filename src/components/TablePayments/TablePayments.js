import React, { useEffect, useState } from "react";
import {Button, Table, Modal,Form, Input} from "antd"
import './tablePayments.css'
import moment from "moment"
import FormPayment from "../FormPayment/FormPayment";
import { useDispatch, useSelector } from "react-redux";
import { loadPayment, makePayment, makeResetPayment,deletePaymentId  } from "../../redux/action/payment";

const TablePayments = ({record}) => {

    let dispatch = useDispatch()

    const {payments} = useSelector((state) => state.data_payments)

    const paymentsTable = []

    paymentsTable.splice(0, paymentsTable.length)
    payments.map(pay => paymentsTable.push({
        _id: pay._id,
        credit_name: pay.credit_name,
        date: moment(pay.date).format('DD.MM.YYYY'),
        summ: pay.summ,
        status: pay.status
    }))

    useEffect(()=> {
        dispatch(loadPayment(record))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [visibleEditModal, setVisibleEditModal] = useState(false)
    const [updatepayment, setUpdatePayment] = useState([])
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)

    
    const setMakeRepayment = () => {
        const add = payments.find(id => id.status === false)
        dispatch(makePayment(add))
    }

    const setDelMakeRepayment = () => {
        const _id = payments.filter(id => id.status === true)
        const del = _id[_id.length - 1]
        dispatch(makeResetPayment(del))
    }

    const showEditModal = () => {
        setVisibleEditModal(true)
        
    }

    const showDeleteModal = () => {
        setVisibleDeleteModal(true)
    }

    const handleEditOk = () => {
        setVisibleEditModal(false)
        setUpdatePayment([])
    }

    const handleDeleteOk = () => {
        setVisibleDeleteModal(false)
    }

    const handleEditCancel = () => {
        setVisibleEditModal(false)
        setUpdatePayment([])
    }

    const handleDeleteCancel = () => {
        setVisibleDeleteModal(false)
    }
    const deletePayment = () => {
        dispatch(deletePaymentId(updatepayment))
        setVisibleDeleteModal(false)
    }
    

    const columns = [
        {
                title: "Дата платежа",
                dataIndex: "date"
        },
        {
                title: "Сумма",
                dataIndex: "summ"
        },
        {
            title: 'Изменить', 
            render: () => (
                <Button type="primary" onClick={showEditModal}>edit</Button>    
              )
          },
          {
            title: 'Удалить', 
            render: () => (
                <Button type="primary" onClick={showDeleteModal}>delete</Button>    
              )
          },
    ]

    return(
        <div className="tablePay">
            <Modal title="Вы уверены, что ходите изменить платеж?"
                visible={visibleEditModal}
                onOk={handleEditOk}
                onCancel={handleEditCancel}>
                        <FormPayment update={updatepayment}/>
            </Modal>
            <Modal title="Вы уверены, что ходите удалить платеж?"
                visible={visibleDeleteModal}
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}>
                    <Form labelCol={{ span: 11 }}
                        wrapperCol={{ span: 7 }}>
                    <Form.Item label="Дата платежа">
                        <Input value={updatepayment.date}/>
                    </Form.Item>
                    <Form.Item label="Сумма">
                        <Input value={updatepayment.summ}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" onClick={deletePayment}>
                            Удалить
                     </Button>
                    </Form>
            </Modal>
            <p className="titlePay">График ежемесячных платежей</p>
            <Table
            onRow={(pay) => {
                return {
                    onClick: () => {setUpdatePayment(pay)}

                }
            }}
                rowClassName={(record, index) => record.status === false ? 'table-row-dark' :  'table-row-light'}
                columns={columns} 
                dataSource={paymentsTable}
            />
            <div className="buttonPayments">
                <Button className="deletePayments" onClick={setDelMakeRepayment}>Отменить платеж</Button>
                <Button className="addPayments" onClick={setMakeRepayment}>Внести платеж</Button>
            </div>
        </div>
    )
}

export default TablePayments