import React, { useEffect, useState } from "react";
import {Button, Table, Modal,Form, Input} from "antd"
import axios from "axios";
import './tablePayments.css'
import moment from "moment";
import FormPayment from "../FormPayment/FormPayment";

const TablePayments = ({record}) => {

    const datapayments =[]
    const [payments, setPayments] = useState([])
    const [idpayments, setIdPayment] = useState("")
    const [iddelpayments, setDelIdPayment] = useState("")
    const [visibleEditModal, setVisibleEditModal] = useState(false)
    const [updatepayment, setUpdatePayment] = useState([])
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false)

    useEffect(()=> {
        axios({
            method: "GET",
            url : `https://backend-dashboard-credits.herokuapp.com/repayments/search/${record}`
        })
        .then(payment => {setPayments(payment.data)})
    }, [record])
    
    const setMakeRepayment = () => {
        axios.get(`https://backend-dashboard-credits.herokuapp.com/repayments/make/${record}`)
        .then(repaymet => setIdPayment(repaymet.data._id))
        axios.post(`https://backend-dashboard-credits.herokuapp.com/repayments/make/update/${idpayments}`)
        axios({
            method: "GET",
            url : `https://backend-dashboard-credits.herokuapp.com/repayments/search/${record}`
        })
        .then(payment => {setPayments(payment.data); console.log(payment.data)})
    }

    const setDelMakeRepayment = () => {
        axios.get(`https://backend-dashboard-credits.herokuapp.com/repayments/makeresert/${record}`)
        .then(repaymet => setDelIdPayment(repaymet.data._id))
        axios.post(`https://backend-dashboard-credits.herokuapp.com/repayments/makeresert/update/${iddelpayments}`)
        axios({
            method: "GET",
            url : `https://backend-dashboard-credits.herokuapp.com/repayments/search/${record}`
        })
        .then(payment => {setPayments(payment.data); console.log(payment.data)})
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
        axios.delete(`https://backend-dashboard-credits.herokuapp.com/repayments/${updatepayment._id}`)
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
                dataSource={payments}
            />
            <div className="buttonPayments">
                <Button className="deletePayments" onClick={setDelMakeRepayment}>Отменить платеж</Button>
                <Button className="addPayments" onClick={setMakeRepayment}>Внести платеж</Button>
            </div>
            <p class="transparent">{payments.map(pay => datapayments.push({
                        _id: pay._id,
                        date: moment(pay.date).format('DD.MM.YYYY'),
                        summ: pay.summ,
                        status: pay.status
            }))}</p>
        </div>
    )
}

export default TablePayments