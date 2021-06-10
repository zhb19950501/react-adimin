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
    

    getCategory = async () => {
        this.setState({loading:true})
        const dataSource = await reqCategory(0)
        
        this.setState({
            dataSource,
            loading:false
        })
    }
    componentDidMount() {
        this.getCategory()
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
                        <LinkButton>查看子分类</LinkButton>
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
        return (

            <Card title="一级分类列表" extra={extra} >
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
