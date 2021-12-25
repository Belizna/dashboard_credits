import React, { useEffect, useState } from "react"
import { Table, Divider } from "antd"
import axios from "axios"
import AnyChart from 'anychart-react'
import moment from "moment"
import "./CreditStatic.css"

const data_static = []
const data_repayment = []

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
]


const CreditStatic = ({record}) => {

    const [ostatok, setOstatok] = useState(1)
    const [viplata, setViplata] = useState(1)
    const [dosrochno, setDosrochno] = useState(1)
    const [duty, setDuty] = useState(1)
    const [staticRepayment, setStaticRepayment] = useState([])
    const [staticTransaction, setStaticTransaction] = useState([])
    const [summ, setSumm] = useState(1)

    useEffect(()=>{

        axios.get(`https://backend-dashboard-credits.herokuapp.com/repayments/ostatok/${record}`)
        .then(ost => { try{setOstatok(ost.data[0].sum)} catch{setOstatok(0)}})
        
        axios.get(`https://backend-dashboard-credits.herokuapp.com/repayments/viplata/${record}`)
        .then(vip => { try{setViplata(vip.data[0].sum)} catch {setViplata(0)}})

        axios.get(`https://backend-dashboard-credits.herokuapp.com/transaction/dosrochno/${record}`)
        .then(dos => { try{setDosrochno(dos.data[0].sum)} catch {setDosrochno(0)}})

        axios.get(`https://backend-dashboard-credits.herokuapp.com/credit/search/${record}`)
        .then(dut => { try{setDuty(dut.data[0].duty)} catch {setDuty(0)}})

        axios.get(`https://backend-dashboard-credits.herokuapp.com/credit/search/${record}`)
        .then(sum => { try{setSumm(sum.data[0].summ)} catch {setSumm(0)}})

        axios.get(`https://backend-dashboard-credits.herokuapp.com/repayments/search/${record}`)
        .then(stat => setStaticRepayment(stat.data))

        axios.get(`https://backend-dashboard-credits.herokuapp.com/transaction/search/${record}`)
        .then(trans => setStaticTransaction(trans.data))
    }, [])

    const dataTable = [
        {   
            ostatok: ostatok,
            viplata: viplata,
            dosrochno: dosrochno,
            economia: duty - ostatok - viplata - dosrochno
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
                ["переплата", duty-summ-dataTable[0].economia]]}
                title="График отношения экономии к переплате"
            />
            <Divider/>
            <AnyChart
                width={800}
                height={400}
                type="column"
                data={data_static}
                title="График досрочных погашений"
            />
            <AnyChart
                width={800}
                height={400}
                type="column"
                data={data_repayment}
                title="График ежемесячных погашений"
            />

<p className="transparent">
    {data_static.splice(0, data_static.length)}
    {data_repayment.splice(0, data_repayment.length)}
        {staticTransaction.map(trans => {data_static.push([moment(trans.date).format('DD.MM'), 
                            trans.summ])})}
        {staticRepayment.map(rep => { rep.status === true ? data_repayment.push([moment(rep.date).format('DD.MM'), 
                            rep.summ]) : console.log() })}
                            </p>
        </>
    )
}

export default CreditStatic