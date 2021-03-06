import React from "react"
import { Form, Input, Button, DatePicker } from 'antd';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addCredit } from '../../redux/action/credits';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const calculator_of_payments = (values) => {
    const stavka = values.percent / 12 / 100;
    const k_annuit = stavka * Math.pow((1 + stavka), values.term) / 
    (Math.pow((1+stavka), values.term) -1)
    const summ = Math.round(k_annuit * values.summ, 2)
    const status = false
    const credit_name = values.name_credit
    var mouth = values.date.substr(5,2)
    var day = values.date.substr(8,2)
    var year = values.date.substr(0,4)
    var osn_ostatok = values.summ
    var proc = 0
    var platej = 0
    mouth++

    
    for(var i = 0; i < values.term; i++)
    { 
        if(mouth < 10)
        {
          var date = (`${year}-0${mouth}-${day}`)
        }
        else if (mouth > 12)
        {
          mouth=1
          year++
           date = (`${year}-0${mouth}-${day}`)
        }
        else{
             date = (`${year}-${mouth}-${day}`)
        }
        proc = Math.round((osn_ostatok * stavka), 2)
        platej = summ - proc
        osn_ostatok-=platej
        console.log('proc = ' + proc + ' platej = ' + platej + ' osn_ostatok = ' + osn_ostatok)
        var oplata = {credit_name, date, summ, status}
        axios.post('https://backend-dashboard-credits.herokuapp.com/repayments/add',oplata)
        mouth++
    }

}

const FormCredit = () => {

  let dispatch = useDispatch()
  const onFinish = (values) => {
    const stavka = values.percent / 12 / 100;
    const k_annuit = stavka * Math.pow((1 + stavka), values.term) / 
    (Math.pow((1+stavka), values.term) -1)
    const summ = Math.round(k_annuit * values.summ, 2)
    var duty = 0
    for(var i = 0; i < values.term; i++)
    {
      duty+=summ
    }
    const value ={
        'name_credit': values['name_credit'],
        'date': values['date'].format('YYYY-MM-DD'),
        'summ' : values['summ'],
        'percent' : values['percent'],
        'term' : values['term'],
        'duty': duty
    }
    dispatch(addCredit(value))
    calculator_of_payments(value)
  };

  return (
    <div className="formCredit">
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item name={['name_credit']} label="????????????????????????">
        <Input />
      </Form.Item>
      <Form.Item name={['date']} label="???????? ????????????????">
      <DatePicker />
      </Form.Item>
      <Form.Item name={['summ']} label="??????????">
        <Input />
      </Form.Item>
      <Form.Item name={['percent']} label="??????????????">
        <Input />
      </Form.Item>
      <Form.Item name={['term']} label="????????">
        <Input />
      </Form.Item>
      <div className="buttonForm">
      <Button type="primary" htmlType="submit">
          ????????????????
        </Button>
        </div>
    </Form>
    </div>
  );
};

export default FormCredit;