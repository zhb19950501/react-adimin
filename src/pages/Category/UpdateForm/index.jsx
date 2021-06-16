import React, { useEffect } from 'react'
import { Form, Input } from "antd"
import PropTypes from "prop-types"

const Item = Form.Item
export default function UpdateForm(props) {
    const { updateName, getFormInstance } = props
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({ updateName })
    }, [form, updateName])

    useEffect(() => {
        getFormInstance(form)
    }, [getFormInstance, form])

    return (
        <Form form={form} >
            <Item
                name="updateName"
                label={"将   " + updateName + "   修改为"}
                rules={[
                    {
                        required: true,
                        message: "添加的名称不允许为空"
                    }
                ]}
            >
                <Input>
                </Input>
            </Item>
        </Form>
    )
}
UpdateForm.propTypes = {
    // updateName:PropTypes.string.isRequired,
    getFormInstance: PropTypes.func.isRequired
}