import React, {useState, useEffect} from 'react';
import { Table , Modal, Button} from 'antd';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import FormCredit from '../FormCredit/FormCredit';

import './tableCredit.css'

const TableCredit = () => {

  const datacredit = []
  const [delcredit, setDelcredit] = useState([])
  const [credit, setCredit] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAddCredit, setIsModalAddCredit] = useState(false);
  const [isSearchTransaction, setIsSearchTransaction] = useState([])

  useEffect(()=> {
    axios({
      method: "GET",
      url: "https://backend-dashboard-credits.herokuapp.com/credit/"
    }).then(
      credits => setCredit(credits.data)
    )
  }, [])

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showAddCreditModel = () => {
    setIsModalAddCredit(true)
  }

  const handleOk = () => {
    setIsModalVisible(false);
    axios.delete(`https://backend-dashboard-credits.herokuapp.com/credit/${delcredit._id}`)
    axios.delete(`https://backend-dashboard-credits.herokuapp.com/transaction/delete/${delcredit.name_credit}`)
    axios.delete(`https://backend-dashboard-credits.herokuapp.com/repayments/delete/${delcredit.name_credit}`)
    axios.get('https://backend-dashboard-credits.herokuapp.com/credit/')
    .then(credits => setCredit(credits.data))
  };
  const handleCreditOk = () => {
    setIsModalAddCredit(false)
    axios.get('https://backend-dashboard-credits.herokuapp.com/credit/')
    .then(credits => setCredit(credits.data))
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
            <Button type="primary"><NavLink to={`/${isSearchTransaction.name_credit}`}>Перейти</NavLink></Button>    
          )
      },
      
    ];
  return (
    <>

    <div className="tableCredit"> 
    <Modal title="Предупреждение!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Вы точно хотите удалить кредит {delcredit.name_credit} ?</p>
      </Modal>
      <Modal title="Создание кредита" visible={isModalAddCredit} onOk={handleCreditOk} onCancel={handleCanselAddCredit}>
          <FormCredit/>
        </Modal>
      <Table 
        onRow={(record) => {
          return {
            onClick: () => {setDelcredit(record); setIsSearchTransaction(record)}
          }
        }}
        dataSource={datacredit} columns={columns}/>
        <Button onClick={showAddCreditModel}>Взять кредит</Button>
    </div>
    {// eslint-disable-next-line
    <p className='transparent'>{credit.map(cred => {datacredit.push({
                              _id: cred._id,
                              name_credit: cred.name_credit,
                              date: moment(cred.date).format('DD.MM.YYYY'),
                              summ: cred.summ,
                              percent: cred.percent,
                              term: cred.term})})}</p>}
    </>
    );
}

export default TableCredit;