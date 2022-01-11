import React, { useEffect, useState } from "react";
import { Table, Button, Modal} from 'antd';
import "./tableTransaction.css"
import moment from "moment"
import FormTransaction from "../FormTransaction/FormTransaction";
import { useDispatch , useSelector} from "react-redux";
import {loadTransaction, transactionDelete} from "../../redux/action/transaction"

const TableTransaction = ({record}) => {

    let dispatch = useDispatch()

    const {transactions} = useSelector((state) => state.data_transactions)
    
    const transactionTable = []
    transactionTable.splice(0, transactionTable.length)

    transactions.map(tran => transactionTable.push({
        _id: tran._id,
        date: moment(tran.date).format('LL'),
        summ: tran.summ
    }))

    useEffect(()=> {
        dispatch(loadTransaction(record))
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [deltransaction, setDeltransaction] = useState([])
    const [isModalAddTransaction, setIsModalAddTransaction] = useState(false)
    const [isModalDeleteTransaction, setIsModalDeleteTransaction] = useState(false)

    const showAddTransaction = () => {
        setIsModalAddTransaction(true)
    }

    const handleOk = () => {
        setIsModalAddTransaction(false)
    }

    const handleDeleteOk = () => {
            dispatch(transactionDelete(deltransaction))
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
                } dataSource={transactionTable} columns={column} />
                <div className="buttonTransaction">
                <Button className="deleteTransaction" onClick={showDeleteTransaction}>Удалить</Button>
                <Button className="addTransaction" onClick={showAddTransaction}>Добавить</Button>
                </div>
            </div>   
        </>   
    )
}

export default TableTransaction;