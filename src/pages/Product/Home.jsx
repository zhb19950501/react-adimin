import { useState, useEffect } from "react"
import { Card, Table, Select, Input, Button, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"

import { PAGE_SIZE } from "../../utils/constance"
import { reqProducts, reqSearchProducts,reqUpdateStatus } from "../../api"
import LinkButton from "../../components/LinkButton"
import { useHistory, useLocation } from "react-router-dom"


const Option = Select.Option
export default function Product() {
    const [dataSource, setDataSource] = useState([])
    const [total, setTotal] = useState(0)
    const [productType, setproductType] = useState("productName")
    const [productName, setproductName] = useState("")
    const [loading,setLoading] = useState(true)
    const [pageNum,setPageNum] = useState(1)
    const history = useHistory()
    const location = useLocation()

    const getProductsData = async (pageNum, productName, productType) => {
        // console.log("getProductsData")
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
                // console.log(list)
                setDataSource(list)
                setTotal(total)
            }
        }

    }
    const changeSellStatus = async (rowData,index)=>{
        setLoading(true)
        const {_id,status} = rowData
        const newStatus = 1 - status 
        const result = await reqUpdateStatus(_id,newStatus)
        setLoading(false)
        if (result.data.status === 0){
            if(newStatus === 0 ){
                message.success("已下架")
            }else{
                message.success("已上架")
            }
            dataSource[index].status = newStatus
            setDataSource([...dataSource])
        }else{
            message.error("更新失败")
        }
    }
    useEffect(() => {
        // console.log("useEffect")
        if(location.state){
            const {pageNum} = location.state
            setPageNum(pageNum)
            getProductsData(pageNum)
        }else{
            getProductsData(1)
        }
    }, [location])


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
            render: (status,rowData,index) => {
                return (
                    <span>
                        <Button type="primary" onClick={()=>{changeSellStatus(rowData,index)}}>{status === 1 ? "下架" : "上架"}</Button>
                        <span>{status === 1 ? "在售" : "已下架"}</span>
                    </span>
                )
            }
        },
        {
            title: '操作',
            width: 100,
            render: (product) => {
                // console.log(product)
                return (
                    <span>
                        <LinkButton onClick={()=>{history.push("/product/detail",{product,pageNum})}}>详情</LinkButton>
                        <LinkButton onClick={()=>{history.push("/product/addupdate",{product,pageNum})}}>修改</LinkButton>
                    </span>
                )
            }
        },
    ]

    // console.log("func"+pageNum)
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
                <Button type="primary" onClick={()=>{history.push("/product/addupdate",{pageNum})}}>
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
                        current:pageNum,
                        pageSize: PAGE_SIZE,
                        total,
                        onChange: (newPageNum)=>{
                            getProductsData(newPageNum)
                            setPageNum(newPageNum)
                        },
                        showSizeChanger: false,
                        showQuickJumper:true,
                        
                    }
                }
            >

            </Table>
        </Card>
    )
}