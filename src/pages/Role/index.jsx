import { Card, Button, Table,Modal, message } from "antd"
import React, { Component } from 'react'
import { reqAddRole, reqRoles, reqUpdateRole } from "../../api"
import { PAGE_SIZE } from "../../utils/constance"
import CreateRole from "./CreateRole"
import AuthRole from "./AuthRole"
import memoryUtils from "../../utils/memoryUtils"
import { formateDate } from "../../utils/dateUtils"

export default class Role extends Component {

    // 初始化表格列配置对象
    columns = [
        {
            title: "角色名称",
            dataIndex: "name"
        },
        {
            title: "创建时间",
            dataIndex: "create_time",
            render:(date)=>formateDate(date)
        },
        {
            title: "授权时间",
            dataIndex: "auth_time",
            render:(date)=>formateDate(date)
        },
        {
            title: "授权人",
            dataIndex: "auth_name",
        },
    ]

    state = {
        dataSource: [],
        rowData: {},
        createRoleVisibleStatus: false,
        authRoleVisibleStatus:false
    }

    
    

    // ajax请求获取DataSource并同步到状态
    getDataSource = async () => {
        const result = await reqRoles()
        if (result.data.status === 0) {
            const dataSource = result.data.data
            this.setState({ dataSource })
        }
    }

    // 表格行的事件配置函数
    onRow = (rowData) => {
        return {
            onClick: (event) => { this.setState({ rowData }) }
        }
    }

    // 点击创建角色对话框Ok的回调
    handleCreateRoleModal = () => {
        // 进行表单验证
        this.form.validateFields().then(
            // 如果表单验证通过，隐藏表单
            async (value) => {
                this.setState({ createRoleVisibleStatus: false })
                const result = await reqAddRole(value)
                if(result.data.status === 0){
                    message.success("添加成功")
                    this.getDataSource()
                }else(
                    message.error(result.data.msg)
                )
            }
        ).catch((err) => {

        })
    }

    handleAuthRoleButton=()=>{
        this.setState({authRoleVisibleStatus:true})
        
    }


    // 授权对话框点击Ok时的回调
    handleAuthRoleModal = async()=>{
        const menus = this.form.getFieldValue("authMenu")
        const _id = this.state.rowData._id
        const auth_name = memoryUtils.user.username
        const auth_time = Date.now()
        const role = {menus,_id,auth_name,auth_time}
        const result = await reqUpdateRole(role)
        this.getDataSource()
        if(result.data.status === 0){
            message.success("设置成功")
        }else{
            message.error(result.data.msg)
        }
        this.setState({ authRoleVisibleStatus: false })
    }


    handleAuthRoleModalCancel= ()=>{
        const {menus} = this.state.rowData
        this.form.setFieldsValue({authMenu:menus})
        this.setState({ authRoleVisibleStatus: false })
        
    }

    // 传递给表单组件获取表单组件form对象
    getFormInstance = (form) => {
        this.form = form
    }

    componentDidMount() {
        this.getDataSource()
    }




    render() {
        // console.log("role组件渲染")
        const { dataSource, rowData, createRoleVisibleStatus,authRoleVisibleStatus } = this.state
        const title = (
            <span>
                <Button type="primary" onClick={()=>{this.setState({createRoleVisibleStatus:true})}}>创建角色</Button>&nbsp;&nbsp;
                <Button type="primary" disabled={!rowData._id} onClick={this.handleAuthRoleButton}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={dataSource}
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
                    rowSelection={{ type: "radio", selectedRowKeys: [rowData._id], onChange: (selectedRowKeys, selectedRows) => { this.setState({ rowData: selectedRows[0] }) } }}
                    onRow={this.onRow}
                >
                </Table>
                <Modal
                    title="添加角色"
                    visible={createRoleVisibleStatus}
                    onOk={this.handleCreateRoleModal}
                    onCancel={()=>{this.setState({ createRoleVisibleStatus: false })}}
                >
                    <CreateRole getFormInstance={this.getFormInstance} />
                </Modal>
                <Modal
                    title="设置权限"
                    visible={authRoleVisibleStatus}
                    onOk={this.handleAuthRoleModal}
                    onCancel={this.handleAuthRoleModalCancel}
                >
                    <AuthRole role={rowData} getFormInstance={this.getFormInstance}/>
                </Modal>
            </Card>
        )
    }
}
