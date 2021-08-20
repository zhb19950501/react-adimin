import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom"
import {reqLogin} from "../../../api"
import memoryUtils from "../../../utils/memoryUtils" 
import localStoreUtils from "../../../utils/localStoreUtils" 

export const NormalLoginForm = () => {
    const history = useHistory()
    const onFinish = async (values) => {
        const {username,password} = values
        const response =  await reqLogin(username,password)
        const result = response.data
        if(result.status === 0 ){
            // 将返回的用户信息保存在内存中
            const user = result.data
            memoryUtils.user = user
            localStoreUtils.saveUser(user)
            history.replace("/home")
            message.success("登录成功")
        }else{
            message.error("登录失败")
        }
     
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
                        validator: (_, value) => {
                            const reg = /^[0-9a-zA-Z_]+$/
                            if (reg.test(value)) {
                                return Promise.resolve()
                            } else {
                                return Promise.reject("不能使用数字字母和下划线外的符号作为用户名")
                            }

                        }
                    }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
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
                    placeholder="密码"
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