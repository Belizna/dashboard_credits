import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal} from 'antd';
import "./tableTransaction.css"
import moment from "moment";
import FormTransaction from "../FormTransaction/FormTransaction";
const TableTransaction = ({record}) => {

    const datatransaction = []
    const [transaction, setTransaction] = useState([])  
    const [deltransaction, setDeltransaction] = useState([])
    const [isModalAddTransaction, setIsModalAddTransaction] = useState(false)
    const [isModalDeleteTransaction, setIsModalDeleteTransaction] = useState(false)

    useEffect(() => {
        axios({
            method: "GET",
            url: `https://backend-dashboard-credits.herokuapp.com/transaction/search/${record}`
        })
        .then(trans => setTransaction(trans.data))
    }, [record])
    const showAddTransaction = () => {
        setIsModalAddTransaction(true)
    }

    const handleOk = () => {
        setIsModalAddTransaction(false)
    }

    const handleDeleteOk = () => {
            axios.delete(`https://backend-dashboard-credits.herokuapp.com/transaction/${deltransaction._id}`)
            setIsModalDeleteTransaction(false)
    }

    const handleDeleteCancel = () => {
        setIsModalDeleteTransaction(false)
    }

    const handleCancel = () => {
        setIsModalAddTransaction(false)
    }
    const showDeleteTransaction = () => {
            setIsModalDeleteTransaction(true)
    }
    const column = [
            {
                title: 'Дата пополнения',
                dataIndex: 'date',
              },
              {
                title: 'Платеж',
                dataIndex: 'summ'
              }
    ]
    return(
        <>
            <Modal title="Предупреждение! Вы точно хотите удалить платеж?"
                visible={isModalDeleteTransaction}
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}></Modal>

            <Modal title="Добавить досрочное погашение" 
                    visible={isModalAddTransaction} onOk={handleOk} onCancel={handleCancel}>
                <FormTransaction record={record}/>
                </Modal>

                
            <div className="tableTransaction">
                <p className="title_transaction">График досрочных пополнений</p>
                <Table onRow={(transaction) => {
                    return {
                        onClick: () => {setDeltransaction(transaction)}
                    }}
                } dataSource={datatransaction} columns={column} />

                <div className="buttonTransaction">
                <Button className="deleteTransaction" onClick={showDeleteTransaction}>Удалить</Button>
                <Button className="addTransaction" onClick={showAddTransaction}>Добавить</Button>
                </div>
            </div>   
            <p class="transparent">
                {transaction.map(tran => datatransaction.push({
                        _id: tran._id,
                        date: moment(tran.date).format('DD.MM.YYYY'),
                        summ: tran.summ
                }))}
            </p>
        </>   
    )
}

export default TableTransaction;