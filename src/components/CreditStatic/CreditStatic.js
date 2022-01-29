import React, { useEffect} from "react"
import { Table, Divider } from "antd"
import AnyChart from 'anychart-react'
import moment from "moment"
import "./CreditStatic.css"

import {sortBy} from "lodash"

import { useDispatch, useSelector } from 'react-redux';
import { loadPayment } from "../../redux/action/payment"
import { loadTransaction} from "../../redux/action/transaction"
import { loadCredits } from "../../redux/action/credits"
import {transactionStatic} from "../../redux/action/credit_static"

const data_static = []
const data_repayment = []
const data_credit_static = []

const columns = [
    {
            title: "Осталось",
            dataIndex: "ostatok"
    },
    {
            title: "Выплачено",
            dataIndex: "viplata"
    },
    {
        title: "Досрочно",
        dataIndex: "dosrochno"
    },
    {
        title: "Экономия",
        dataIndex: "economia"
    },
    {
        title: "Месяцев выплачено",
        dataIndex: "mouth_viplata"
    },
    {
        title: "Месяцев осталось",
        dataIndex: "mouth_ostatok"
    },
]


const CreditStatic = ({record}) => {

    let dispatch = useDispatch()

    const {credit_static} = useSelector((state)=> state.data_credit_static)
    const {credits} = useSelector((state) => state.data_credits)
    const {payments} = useSelector((state) => state.data_payments)
    const {transactions} = useSelector((state) => state.data_transactions)

    const viplata = payments.filter(stat => stat.status === true).reduce((a,b) => a + b.summ, 0)
    const dosrochno = transactions.reduce((a,b) => a + b.summ, 0)
    const ostatok = payments.filter(stat => stat.status === false).reduce((a,b) => a + b.summ,0)
    const duty = credits.filter(cred => cred.name_credit === record)[0].duty
    const summ = credits.filter(cred => cred.name_credit === record)[0].summ
    const mouth_viplata = payments.filter(stat => stat.status === true).length
    const mouth_ostatok = payments.filter(stat => stat.status === false).length


    data_static.splice(0, data_static.length)
    data_repayment.splice(0, data_repayment.length)
    data_credit_static.splice(0, data_credit_static.length)

        transactions.map(trans => data_static.push([moment(trans.date).format('DD.MM'), 
                            trans.summ]))

            if (credit_static.data === undefined) {
                console.log('pusto')
            }
            else { 
                const data_sortby = sortBy(credit_static.data, o => o._id)
                data_sortby.map(trans => data_credit_static.push([moment(trans._id).format('MM.YYYY'), trans.sum]))
            }

            payments.filter(rep => rep.status === true).map(rep => 
                data_repayment.push([moment(rep.date).format('DD.MM'), rep.summ]))

    useEffect(()=>{
        dispatch(transactionStatic(record))
        dispatch(loadCredits())
        dispatch(loadPayment(record))
        dispatch(loadTransaction(record))
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const dataTable = [
        {      

            ostatok: ostatok,
            viplata: viplata,
            dosrochno: dosrochno,
            economia: duty - ostatok - viplata - dosrochno,
            mouth_viplata: mouth_viplata,
            mouth_ostatok: mouth_ostatok
        }
    ]

    return (
        <>
        <div className="staticPay">
            <p className="titleStatic">Сводная статистика</p>
            <Table dataSource={dataTable} columns={columns}/>
            <div className="LineChart">
            </div>
        </div>
            <AnyChart
            pallete={["Black", "Green"]}
                width={800}
                height={400}
                type="pie"
                data={[["выплачено",dataTable[0].viplata + dataTable[0].dosrochno], 
                ["осталось", dataTable[0].ostatok]]}
                title="График отношения выплаты к остатку"
            />
            <AnyChart
                width={800}
                height={400}
                type="pie"
                data={[["экономия",dataTable[0].economia], 
                ["переплата", duty - summ - dataTable[0].economia]]}
                title="График отношения экономии к переплате"
            />
            <Divider/>
            {data_credit_static && <AnyChart
                width={800}
                height={400}
                type="column"
                data={data_credit_static}
                title="График досрочных погашений в сумме по месяцам"
            />}
             {data_static && <AnyChart
                width={800}
                height={400}
                type="column"
                data={data_static}
                title="График досрочных погашений"
            />}
            
            <AnyChart
                width={800}
                height={400}
                type="column"
                data={data_repayment}
                title="График ежемесячных погашений"
            />
        </>
    )
}

export default CreditStatic