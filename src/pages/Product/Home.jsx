import { useState, useEffect } from "react"
import { Card, Table, Select, Input, Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

import { PAGE_SIZE } from "../../utils/constance"
import { reqProducts, reqSearchProducts } from "../../api"
import LinkButton from "../../components/LinkButton"


const Option = Select.Option
export default function Product() {
    const [dataSource, setDataSource] = useState([])
    const [total, setTotal] = useState(0)
    const [productType, setproductType] = useState("productName")
    const [productName, setproductName] = useState("")
    const [loading,setLoading] = useState(true)

    const getProductsData = async (pageNum, productName, productType) => {
        setLoading(true)
        if (!productName) {
            const { data: result } = await reqProducts(pageNum, PAGE_SIZE)
            if (result.status === 0) {
                setLoading(false)
                const { total, list } = result.data
                setDataSource(list)
                setTotal(total)
            }
        }else{
            const { data: result } = await reqSearchProducts(pageNum, PAGE_SIZE,productName,productType)
            if (result.status === 0) {
                setLoading(false)
                const { total, list } = result.data
                console.log(list)
                setDataSource(list)
                setTotal(total)
            }
        }

    }

    useEffect(() => {
        getProductsData(1)
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
                        <Button type="primary">{status === 1 ? "下架" : "上架"}</Button>
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
                    <Select
                        defaultValue={productType}
                        style={{ width: 150 }}
                        onChange={(value) => { setproductType(value) }}
                    >
                        <Option value="productName">按名称搜索</Option>
                        <Option value="productDesc">按描述搜索</Option>
                    </Select>
                    <Input
                        placeholder="关键字"
                        style={{ margin: "0 10px", width: 150 }}
                        onChange={(e) => { setproductName(e.target.value) }}
                    />
                    <Button type="primary" onClick={()=>{getProductsData(1, productName, productType)}}>搜索</Button>
                </span>}

            extra={
                <Button type="primary">
                    <PlusOutlined></PlusOutlined>
                    添加商品
                </Button>
            }
        >
            <Table
                loading={loading}
                bordered
                rowKey="_id"
                dataSource={dataSource}
                columns={columns}
                pagination={
                    {
                        pageSize: PAGE_SIZE,
                        total,
                        onChange: getProductsData,
                        showSizeChanger: false,
                        showQuickJumper:true

                    }
                }
            >

            </Table>
        </Card>
    )
}