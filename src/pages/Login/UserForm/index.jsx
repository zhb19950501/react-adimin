import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLoading} from "../../../api"
import {useHistory} from "react-router-dom"

export const NormalLoginForm = (a) => {
    const history = useHistory()
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const result = await reqLoading(values)
        if(result.status === 0){
            message.success("登录成功")
            history.replace("/")
        }else{
            message.error("登录失败," + result.msg)
        }
        console.log(result)
    };
    
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                initialValue="admin"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    {
                        validator:(_,value)=>{
                            const reg = /^[0-9a-zA-Z_]+$/
                            if(reg.test(value)){
                                return Promise.resolve()
                            }else{
                                return Promise.reject("请使用数字字母和下划线")
                            }
                        }
                    }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};