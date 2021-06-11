import React,{useEffect}  from 'react'
import {Form,Input } from "antd"
import PropTypes from "prop-types"

const Item = Form.Item
export default function UpdateForm(props) {
    const {updateName,getFormInstance} = props
    const [form] = Form.useForm()
    useEffect(()=>{
        form.setFieldsValue({updateName})
    },[form,updateName])
    useEffect(()=>{
        getFormInstance(form)
    },[getFormInstance,form])
    console.log("渲染")
    return (
    <Form form={form} >
        <Item name="updateName" label={"将   "+updateName+"   修改为"} >
            <Input>
            </Input>
        </Item>
    </Form>
    ) 
}
UpdateForm.propTypes={
    updateName:PropTypes.string.isRequired,
    getFormInstance:PropTypes.func.isRequired
}