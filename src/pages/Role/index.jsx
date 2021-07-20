import {Card,Button,Table } from "antd"
import React, { Component } from 'react'
import { reqRoles } from "../../api"
import { PAGE_SIZE } from "../../utils/constance"

export default class Role extends Component {

    // 初始化表格列配置对象
    columns = [
        {
            title:"角色名称",
            dataIndex:"name"
        },
        {
            title:"创建时间",
            dataIndex:"create_time"
        },
        {
            title:"授权时间",
            dataIndex:"auth_time"
        },
        {
            title:"授权人",
            dataIndex:"auth_name"
        },
    ]

    state = {
        dataSource:[],
        rowData:{}
    }
    // ajax请求获取DataSource并同步到状态
    getDataSource = async()=>{
        const result = await reqRoles()
        if(result.data.status === 0){
            const dataSource = result.data.data
            this.setState({dataSource})
        }
    }

    // 表格行的事件配置函数
    onRow=(rowData)=>{
        return {
            onClick:(event)=>{this.setState({rowData})}
        }
    }

    
    componentDidMount(){
        this.getDataSource()
    }

    


    render() {
        const {dataSource,rowData} = this.state
        const title = (
            <span>
                <Button type="primary">创建角色</Button>&nbsp;&nbsp;
                <Button type="primary" disabled={!rowData._id}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={dataSource}
                    columns={this.columns}
                    pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true}}
                    rowSelection={{type:"radio",selectedRowKeys:[rowData._id],onChange:(selectedRowKeys,selectedRows)=>{this.setState({rowData:selectedRows[0]})}}}
                    onRow={this.onRow}
                >
                </Table>
            </Card>
        )
    }
}
