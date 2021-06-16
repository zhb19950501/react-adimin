import React, { Component } from 'react'
import { Card, Table, Modal } from 'antd';
import {
    SwapRightOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import LinkButton from "../../components/LinkButton"
import AddForm from "./AddForm"
import UpdateForm from "./UpdateForm"
import { reqCategory, reqUpdateCategory, reqAddCategory } from "../../api"

export default class Category extends Component {
    state = {

        dataSource: [], // 表格中的所有数据
        loading: true, // 是否正在加载
        visibleStatus: 0, // 0表示全部隐藏，1显示添加确认框，2显示更新确认框
        updateName: "", // 更新元素名称
        currentRowData: {},   //点击更新时，所在行的数据
        currentPageData: [], //当前显示页表格数据源
        currentName: "一级分类列表", //当前所处分类名称
        currentId: "0",  // 当前所处分类的ID
        usedDatas: [{ id: "0", name: "一级分类列表" }]

    }

    // 点击查看子分类的回调
    handleCheckChild = async (text) => {
        let { usedDatas } = this.state
        const currentId = text._id
        const currentName = text.name
        const currentData = { id: currentId, name: currentName }
        // 将当前行数据放入已使用数据中
        usedDatas = [...usedDatas, currentData]
        const dataSource = await this.getCategory(currentId)
        const currentPageData = dataSource.slice(0, 10)
        console.log(currentPageData)
        this.setState({ dataSource, currentPageData, usedDatas, currentId, currentName })

    }
    // 点击查看子分类后，在标题点击一级分类列表后的回调
    handleCheckParent = async (usedData, index) => {
        // 根据点击的标题的id获取新数据
        const { id, name } = usedData
        const dataSource = await this.getCategory(id)
        const currentPageData = dataSource.slice(0, 10)
        // console.log(currentPageData)
        // 获取新的标题信息
        const { usedDatas } = this.state
        const newusedDatas = usedDatas.slice(0, index + 1)
        // 设置新数据源，新标题信息，保存当前所处目录级别，当前页面数据源
        this.setState({ dataSource, currentPageData, usedDatas: newusedDatas, currentId: id, currentName: name })
    }

    // 点击修改分类的回调
    showUpdateModal = (text) => {
        this.setState({ visibleStatus: 2, currentRowData: text })
    }
    // 修改对话框点击OK后的回调
    handleUpdateCategory = () => {
        const { currentRowData, currentId } = this.state
        this.form.validateFields().then(
            async (value) => {
                // 0.隐藏对话框
                this.setState({ visibleStatus: 0 })
                // 1.获取对话框中用户输入的数据
                const categoryNewName = value.updateName
                // 2.清空对话框
                this.form.resetFields()
                // 3.获取用户点击修改更新行的数据的id
                const categoryId = currentRowData._id
                // 4.发送请求更新数据库
                reqUpdateCategory({ categoryName: categoryNewName, categoryId })
                // 5.获取新数据
                const dataSource = await this.getCategory(currentId)
                // 6.更新表格
                this.setState({ dataSource })
            })

    }

    // 点击添加的回调 
    showAddModal = () => {
        this.setState({ visibleStatus: 1 })
    }

    // 添加对话框点击Ok后的回调
    handleAddCategory = () => {
        this.form.validateFields().then(
            async (value) => {
                const categoryName = value.newCategory
                let currentId = value.currentName
                this.setState({ visibleStatus: 0 })
                if (currentId === this.state.currentId) {
                    // 如果在当前目录下添加，则更新数据
                    reqAddCategory(categoryName, currentId)
                    const dataSource = await this.getCategory(currentId)
                    this.setState({ dataSource })
                    this.form.resetFields()
                } else {
                    // 否则不用更新，继续维持当前页面即可
                    reqAddCategory(categoryName, currentId)
                    this.form.resetFields()
                }
            }
        ).catch((err) => {

        })
    }


    // 获取表单的form对象，form对象上有很多神奇方法可以操作表单
    getFormInstance = (form) => {
        this.form = form
    }

    // 对话框点击取消后的回调
    handleCancel = () => {
        this.setState({ visibleStatus: 0 })
        // this.form.resetFields()
    }

    // 根据传入的id获取数据
    getCategory = async (id) => {
        this.setState({ loading: true })
        const dataSource = await reqCategory(id)
        this.setState({ loading: false })
        return dataSource

    }
    //表格更新变化时的回调
    handleTableChange = (pagination) => {
        // 0.获取当前所处页编号及每页显示数据的数量
        const { current, pageSize } = pagination
        // 1.获取当前所处页内的表格数据
        const startNum = (current - 1) * pageSize
        const endNum = current * pageSize
        const { dataSource } = this.state
        // slice方法包头不包尾
        const currentPageData = dataSource.slice(startNum, endNum)
        // 2.更新当前页表格数据到状态
        this.setState({ currentPageData })
    }

    // 组件挂载后获取数据更新组件
    componentDidMount() {
        const getData = async () => {
            // 获取初始表格数据
            const dataSource = await this.getCategory("0")
            // 获取当前页表格数据
            const currentPageData = dataSource.slice(0, 10)
            // 更新到状态
            this.setState({ dataSource, loading: false, currentPageData })
        }
        getData()

    }
    // 表头
    columns = [
        {
            title: '分类的名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            width: 300,
            render: (text) => {

                return (
                    <span>
                        <LinkButton onClick={() => { this.showUpdateModal(text) }}>修改分类</LinkButton>
                        <LinkButton onClick={() => { this.handleCheckChild(text) }}>查看子分类</LinkButton>

                    </span>
                )
            }
        }
    ]

    render() {
        // 卡片右侧
        const extra = (
            <LinkButton onClick={this.showAddModal}>
                <PlusOutlined />
                <span>添加</span>
            </LinkButton>)
        const { dataSource, currentId, currentName, loading, visibleStatus, currentRowData, currentPageData, usedDatas } = this.state
        const updateName = currentRowData.name
        return (

            <Card
                title={
                    usedDatas.map((usedData, index) => {
                        if (index < usedDatas.length - 1) {
                            return (
                                <LinkButton onClick={() => { this.handleCheckParent(usedData, index,) }} key={usedData.id}>{usedData.name}<SwapRightOutlined /></LinkButton>
                            )
                        } else {
                            return (
                                <span key={usedData.id}>{usedData.name}</span>
                            )
                        }
                    })
                }

                extra={extra} >
                <Table
                    rowKey="_id"
                    dataSource={dataSource}
                    columns={this.columns}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    onChange={this.handleTableChange}
                >

                </Table>

                <Modal
                    title="添加"
                    visible={visibleStatus === 1}
                    onOk={this.handleAddCategory}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <AddForm currentPageData={currentPageData} currentId={currentId} currentName={currentName} getFormInstance={this.getFormInstance} />
                </Modal>

                <Modal
                    title="更新"
                    visible={visibleStatus === 2}
                    onOk={this.handleUpdateCategory}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm updateName={updateName} getFormInstance={this.getFormInstance} />
                </Modal>
            </Card>
        )
    }
}
