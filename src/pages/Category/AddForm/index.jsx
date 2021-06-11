import React from 'react'
import {Form,Select,Input } from "antd"

const Item = Form.Item
const Option = Select.Option
export default function AddForm(props) {
    const {currentPageData,parentId,parentName} = props
    return (
    <Form>
        <Item name="category" label="选择分类" labelCol={{span:6}} labelAlign="left" initialValue={parentId}>
            <Select>
                <Option value={parentId}>{parentName}</Option>
                {
                    currentPageData.map((c)=>{
                        return <Option value={c._id} key={c._id}>{c.name}</Option>
                    })
                }
            </Select>
        </Item>
        <Item name="newCategory" label="新分类名称" labelCol={{span:6}} labelAlign="left">
            <Input></Input>
        </Item>
    </Form>
    ) 
}