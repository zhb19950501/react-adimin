import { useState,useEffect } from "react"
import { Card, Table, Select, Input,Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

import {reqProducts} from "../../api"
import LinkButton from "../../components/LinkButton"


const Option = Select.Option
export default function Product() {
    const pageNum = 1
    const pageSize = 1
    const [dataSource, setDataSource] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        (async () => {
            const {data:result} = await reqProducts(pageNum,pageSize)
            
            if(result.status === 0){
                const {total,list} = result.data
                setDataSource(list)
                setTotal(total)
            }
        })()
    }, [])
        
        
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc'
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => {
                return "￥" + price
            }
        },
        {
            title: '状态',
            width: 100,
            dataIndex: 'status',
            render: (status) => {
                return (
                    <span>
                        <Button type="primary">{status === 1 ? "下架" : "上架"}</Button>t
                        <span>{status === 1 ? "在售" : "已下架"}</span>
                    </span>
                )
            }
        },
        {
            title: '操作',
            width: 100,
            render: () => {
                return (
                    <span>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            }
        },
    ]

    return (
        <Card
            title={
                <span>
                    <Select value="1" style={{width:150}}>
                        <Option value="1">按名称搜索</Option>
                        <Option value="2">按描述搜索</Option>
                    </Select>
                    <Input placeholder="关键字" style={{margin:"0 10px",width:150}}/>
                    <Button type="primary">搜索</Button>
                </span>}

            extra={
                <Button type="primary">
                    <PlusOutlined></PlusOutlined>
                    添加商品
                </Button>
            }
        >
            <Table
                bordered
                rowKey="_id"
                dataSource={dataSource}
                columns={columns}
                total={total}
            >

            </Table>
        </Card>
    )
}