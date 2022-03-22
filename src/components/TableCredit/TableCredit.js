import React, {useState, useEffect} from 'react';
import { Table , Modal, Button} from 'antd';
import {NavLink} from 'react-router-dom'
import moment from "moment"
import axios from 'axios';
import FormCredit from '../FormCredit/FormCredit';
import './tableCredit.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCredit, loadCredits } from '../../redux/action/credits';

const TableCredit = () => {

  let dispatch = useDispatch()

  const creditsTable = []
  const {credits} = useSelector((state) => state.data_credits)

  creditsTable.splice(0, creditsTable.length)
  credits.map(cred => creditsTable.push(
    {_id: cred._id,
      name_credit: cred.name_credit,
      date: moment(cred.date).format('DD.MM.YYYY'),
      duty: cred.duty,
      percent: cred.percent,
      summ: cred.summ,
      term: cred.term}
  ))
  useEffect(()=> {
      dispatch(loadCredits())
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [actionCredit, setActionCredit] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAddCredit, setIsModalAddCredit] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showAddCreditModel = () => {
    setIsModalAddCredit(true)
  }

  const handleOk =  () => {
    setIsModalVisible(false);
    axios.delete(`https://backend-dashboard-credits.herokuapp.com/transaction/delete/${actionCredit.name_credit}`)
    axios.delete(`https://backend-dashboard-credits.herokuapp.com/repayments/delete/${actionCredit.name_credit}`)
    dispatch(deleteCredit(actionCredit._id))
  };

  const handleCreditOk = () => {
    setIsModalAddCredit(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const handleCanselAddCredit = () => {
    setIsModalAddCredit(false)
  } 

    const columns = [
      {
        title: 'Наименование',
        dataIndex: 'name_credit',
      },
      {
        title: 'Дата создания',
        dataIndex: 'date'
      },
      {
        title: 'Сумма',
        dataIndex: 'summ'
      },
      {
        title: 'Процент',
        dataIndex: 'percent'
      },
      {
        title: 'Срок',
        dataIndex: 'term'
      },
      {
        title: 'Событие', 
        render: () => (
            <Button type="primary" onClick={showModal}>Delete</Button>    
          )
      },
      {
        title: 'Подробно', 
        render: () => (
            <Button type="primary"><NavLink to={`/credit/${actionCredit.name_credit}`}>Next</NavLink></Button>    
          )
      },
      
    ];

    
  return (
    <>
    <div className="tableCredit"> 
    <Modal 
        title="Предупреждение!" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}>
        <p>Вы точно хотите удалить кредит {actionCredit.name_credit} ?</p>
      </Modal>

      <Modal title="Создание кредита" 
          visible={isModalAddCredit} 
          onOk={handleCreditOk} 
          onCancel={handleCanselAddCredit}>
          <FormCredit/>
        </Modal>

    <Table onRow={(record) =>{return{onClick: () => { setActionCredit((req) => record)}}}}
        dataSource={creditsTable} columns={columns}
      />
        
        <Button onClick={showAddCreditModel}>Взять кредит</Button>
    </div>
    </>
    );
}

export default TableCredit;