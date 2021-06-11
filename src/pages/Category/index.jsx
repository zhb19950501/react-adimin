import React, { Component } from 'react'
import { Card, Table } from 'antd';
import {
    PlusOutlined,
} from '@ant-design/icons'
import LinkButton from "../../components/LinkButton"

import {  reqCategory } from "../../api"

export default class Category extends Component {
    state = {
        dataSource: [],
        loading:false
    }
    
    handleCheckChild=(text)=>{
        console.log(text.parentId)
        const parentId = text._id
        this.getCategory(parentId)
    }

    getCategory = async (parentId) => {
        this.setState({loading:true})
        const dataSource = await reqCategory(parentId)
        
        this.setState({
            dataSource,
            loading:false
        })
    }

    componentDidMount() {
        this.getCategory("0")
    }
    columns = [
        {
            title: '分类的名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            width:300,
            render: (text) => {
                
                return (
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        {/* <LinkButton onClick={()=>{this.handleCheckChild(text)}}>查看子分类</LinkButton> */}
                        {text.parentId === "0"? <LinkButton onClick={()=>{this.handleCheckChild(text)}}>查看子分类</LinkButton>:null}
                    </span>
                )
            }
        }
    ]

    render() {
        const extra = (
            <LinkButton>
                <PlusOutlined />
                <span>添加</span>
            </LinkButton>)
        const {dataSource} = this.state
        console.log(dataSource)

        return (

            <Card title={ dataSource.parentId==="0" ? "一级分类列表" :(<LinkButton>一级分类列表<span>aaa</span></LinkButton>)} extra={extra} >
                <Table
                    rowKey="_id"
                    dataSource={this.state.dataSource}
                    columns={this.columns}
                    loading={this.state.loading}
                    
                    >
                    
                </Table>
            </Card>
        )
    }
}
