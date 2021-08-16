import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from "antd"
import {formateDate} from "../../utils/dateUtils"
import LinkButton from "../../components/LinkButton"
import { reqDeleteUser, reqUsers ,reqAddUser,  reqUpdateUser} from '../../api'
import AddUserForm from "./AddUserForm"

export default class User extends Component {
    state={
        dataSource:[],
        loading:false,
        isShow:false,
        roles:[]
    }

    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render:formateDate
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            
            render:(role_id)=>{
                return this.rolesName[role_id]
            }
        },
        {
            title: '操作',
            render:(rowDate)=>{
                return(
                    <span>
                        <LinkButton onClick={()=>{this.showUpdate(rowDate)}}>修改</LinkButton>
                        <LinkButton onClick={()=>{this.deleteUser(rowDate)}}>删除</LinkButton>
                    </span>
                )
            }
        },
        
    ]

    showUpdate=(rowDate)=>{
        this.rowDate = rowDate
        console.log(rowDate)
        this.setState({isShow:true})
    }

    deleteUser=(rowDate)=>{
        Modal.confirm({
            title:"确认删除"+rowDate.username+"吗",
            onOk:async()=>{
                const result = await reqDeleteUser(rowDate._id)
                if(result.data.status === 0){
                    message.success("删除用户成功")
                    this.getUsers()
                }
            }
        })
    }

    getUsers = async()=>{
        const result = await reqUsers()
        if(result.data.status === 0){
            const {roles,users} = result.data.data
            const rolesName = roles.reduce((pre,role)=>{
                pre[role._id] = role.name
                return pre
            },{})
            this.rolesName = rolesName
            this.setState({dataSource:users,roles})
        }else{
            message.error("获取用户列表信息失败")
        }

        // console.log(result)
    }

    componentDidMount(){
        console.log("componentDidMount")
        
        this.getUsers()
    }

    handleAddOrUpdate=()=>{
        this.form.validateFields().then(

            async(values)=>{
                if(this.rowDate){
                    // for(const key in values){
                    //     if(!values[key]){
                    //         delete values[key]
                    //     }
                    // }
                    values._id = this.rowDate._id
                    console.log(values)
                    const result = await reqUpdateUser(values)
                    if(result.data.status===0){
                        message.success("更新成功")
                    }else{
                        message.error(result.data.msg)
                    }
                    this.rowDate = null
                }else{
                    const result = await reqAddUser(values)
                    if(result.data.status===0){
                        message.success("添加成功")
                    }else{
                        message.error(result.data.msg)
                    }
                }
                this.getUsers()
                this.setState({isShow:false})
                this.form.resetFields()
            }
        ).catch(
            (error)=>{
                console.log(error)
                message.error("请正确输入表单")
            }
        )
        
    }

    setForm = (form)=>{
        this.form = form
    } 

    render() {
        console.log("render")
        const title = (<Button typr ="primary" onClick={()=>{this.setState({isShow:true})}}>创建用户</Button>)
        const {dataSource,loading,isShow,roles} = this.state
        return (
            <Card
                title={title}
            >
                <Table
                    rowKey="_id"
                    dataSource={dataSource}
                    columns={this.columns}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                >
                </Table>
                <Modal
                    title={this.rowDate?"修改":"添加"}
                    visible={isShow}
                    onOk={this.handleAddOrUpdate}
                    onCancel={()=>{
                        this.setState({isShow:false}) 
                        this.form.resetFields()
                        this.rowDate = null
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <AddUserForm 
                        setForm = {this.setForm}
                        roles={roles}
                        rowDate={this.rowDate}
                    ></AddUserForm>
                </Modal>
            </Card>
        )
    }
}
