import { Form,Input,Select} from "antd"
import {useEffect} from  "react"
const {Item} = Form
const {Option} = Select
export default  function AddUserForm(props){
    const [form] = Form.useForm()
    const {setForm,roles,rowDate} = props
    useEffect(() => {
        // setForm函数如果是写成内联的箭头函数，那么每次传下来都会不同会导致重复调用，这是没有必要的~
        // 在类组件里，把内联的箭头函数提取出来变成组件身上的方法，这样就不会引起子组件接收到的props里的函数出现变化了
        // console.log("useEffect")
        setForm(form)
        
    }, [setForm,form,rowDate])

    useEffect(() => {
        form.setFieldsValue(rowDate)
     
    }, [form,rowDate])

    return (
        <Form
            form={form}
            labelCol={{span:3}}
            labelAlign="left"
            
        >
            <Item label="用户名" name="username" rules={[{required:true,message:"请输入用户名"}]}>
                <Input placeholder="请输入用户名"></Input>
            </Item>
            <Item label="密码" name="password" rules={[{required:true,message:"请输入用户名"}]}>
                <Input placeholder="请输入密码" type="password" ></Input>
            </Item>
            <Item label="手机号" name="phone" rules={[{len:11,message:"手机号码长度应为13位"}]}>
                <Input placeholder="请输入手机号"></Input>
            </Item>
            <Item label="邮箱" name="email" rules={[{type:"email",message:"请输入正确邮箱"}]}>
                <Input placeholder="请输入邮箱"></Input>
            </Item>
            <Item label="角色" name="role_id">
                <Select placeholder="请选择角色">
                    {roles.map(role=><Option value={role._id} key={role._id}>{role.name}</Option>)}
                </Select>
            </Item>
        </Form>
    )
}