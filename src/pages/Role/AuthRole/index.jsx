import React, { useEffect,useState} from 'react'
import { Tree, Form, Input } from 'antd'
import menuList from "../../../config/menuConfig"
const Item = Form.Item


const AuthTree = (props) => {
    
    // 每次渲染接受都的props的地址都是不同的，是不同的对象，会触发useEffect
    // 但是其中的menus的地址是不变的，onChange函数的地址是变化的，虽然每个onChange函数都是长成一样的
    // 在menus不同是，组件刚开始获得的value应该也是不同的
    const { value, onChange } = props
    const [checkedKeys, setcheckedKeys] = useState([])
    // const onChangeRef = useRef(onChange)
    // console.log(onChange===onChangeRef.current,onChange+"",onChangeRef+"")
    // console.log("authtree渲染")
    useEffect(()=>{
        setcheckedKeys(value)
    },[value])

    const onCheck = (checkedKeysValue) => {
        // console.log("onCheck")
        setcheckedKeys(checkedKeysValue)
        onChange(checkedKeysValue)
    }
    // console.log("authtree",value)
    return (
        <Tree
            checkable
            defaultExpandAll
            checkedKeys={checkedKeys}
            treeData={menuList}
            onCheck={onCheck}
        />
    )
}
export default function AuthRole(props) {
    // console.log("authRole组件渲染")
    // 这里props 是由类式组件下发的，props的地址虽然每次都是不一样的，但是props里的东西的地址是不变的
    const { name, menus } = props.role
    const [form] = Form.useForm()
    const { getFormInstance } = props

    useEffect(() => {
        // console.log("AUTHROLE EFFECT")
        getFormInstance(form)
    }, [form,getFormInstance])

    useEffect(() => {
        form.setFieldsValue({authMenu:menus})
    }, [menus,form])
    return (
        <Form
            form={form}
        >
            <Item
                label="角色名称"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 12 }}
            >
                <Input
                    value={name}
                    disabled
                ></Input>
            </Item>
            <Item
                name="authMenu" 
            >
                <AuthTree />
            </Item>
        </Form>
    )
}