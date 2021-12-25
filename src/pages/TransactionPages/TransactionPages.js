import React from "react";
import { useParams } from "react-router";
import CreditStatic from "../../components/CreditStatic/CreditStatic";
import TablePayments from "../../components/TablePayments/TablePayments";
import TableTransaction from "../../components/TableTransaction/TableTransaction";
import { Tabs } from "antd";
import "./transactionPages.css"

const {TabPane} = Tabs

const TransactionPages = () => {
    const {handle} = useParams()
    return(
        <>
        <div className="transactionPages">
        <Tabs defaultActiveKey="1" centered>
    <TabPane tab="Таблица платежей" key="1">
        <TablePayments record={handle}/>
    </TabPane>
    <TabPane tab="Досрочные погашения" key="2">
        <TableTransaction record={handle}/>
    </TabPane>
    <TabPane tab="Выходная статистика" key="3">
        <CreditStatic record={handle}/>
    </TabPane>
        </Tabs>
        </div>
        </>
    )
}

export default TransactionPages