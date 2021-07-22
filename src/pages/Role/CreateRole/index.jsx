import React, { useEffect } from 'react'
import { Form, Input } from "antd"
import PropTypes from "prop-types"

const Item = Form.Item
export default function CreateRole(props) {
    const [form] = Form.useForm()
    useEffect(() => {
        const { getFormInstance } = props
        getFormInstance(form)
    }, [form,props])

    return (
        <Form form={form} >
            <Item
                name="roleName"
                label="添加角色"
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
CreateRole.propTypes = {
    // updateName:PropTypes.string.isRequired,
    getFormInstance: PropTypes.func.isRequired
}