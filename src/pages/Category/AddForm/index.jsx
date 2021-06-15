import React,{useEffect} from 'react'
import {Form,Select,Input } from "antd"

const Item = Form.Item
const Option = Select.Option
export default function AddForm(props) {
    const {currentPageData,currentId,currentName,getFormInstance} = props
    const [form] = Form.useForm()
    useEffect(() => {
        getFormInstance(form)
    }, [form,getFormInstance])

    useEffect(()=>{
        form.setFieldsValue({currentName})
    },[form,currentName])
    // console.log("重新渲染，当前所处id为" + currentId +"所处分类为" + currentName)
    return (
    <Form form={form}>
        <Item name="currentName" label="在分类" labelCol={{span:6}} labelAlign="left">
            <Select>
                <Option value={currentId} key={currentId}>{currentName}</Option>
                {
                    currentPageData.map((c)=>{
                        return <Option value={c._id} key={c._id}>{c.name}</Option>
                    })
                }
            </Select>
        </Item>
        <Item name="newCategory" label="中添加" labelCol={{span:6}} labelAlign="left">
            <Input></Input>
        </Item>
    </Form>
    ) 
}