import { useHistory, useLocation } from "react-router-dom"
import {
  Card,
  Form,
  Input,
  Button
} from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import LinkButton from "../../components/LinkButton"
import LazyOptions from "./LazyOptions"
import PicturesWall from "./PicturesWall"
/*
  要做表单验证所以使用Form组件
*/
const { Item } = Form
const { TextArea } = Input

export default function AddUpdate() {
  const history = useHistory()
  const location = useLocation()
  const { pageNum, product } = location.state
  const isUpdate = !!product

  // 页面左上返回箭头及标题
  const title = (
    <span>
      <LinkButton onClick={() => { history.push("/product", { pageNum }) }}>
        <ArrowLeftOutlined />
      </LinkButton>
      <span>{isUpdate ? "修改商品" : "添加商品"}</span>
    </span>
  )
  // 表单布局配置对象
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 6 }
  }
  // 自定义验证价格
  const validatePrice = (_, value) => value <= 0 ? Promise.reject(new Error("商品价格必须大于0")) : Promise.resolve()

  // 表单提交时的回调-->发送请求添加商品
  const onFinish = (value) => {
    console.log(value)
  }
  // 修改页的表单初始化值
  let initialValues = {}
  if (isUpdate) {
    initialValues = {
      ...product,
      categorys: [product.pCategoryId, product.categoryId,]
    }
  }
  return (
    <Card title={title}>

      <Form {...formItemLayout} onFinish={onFinish} initialValues={initialValues}>
        <Item label="商品名称" name="name" rules={[{ required: true, message: "请输入商品名称" }]}>
          <Input placeholder="请输入商品名称"></Input>
        </Item>
        <Item label="商品描述" name="desc" rules={[{ required: true, message: "请输入商品描述" }]}>
          <TextArea placeholder="请输入商品描述" autosize={{ minRows: 2, maxRows: 6 }}></TextArea>
        </Item>
        <Item label="商品价格" name="price" rules={[{ required: true, message: "请输入商品价格" }, { validator: validatePrice }]}>
          <Input type="number" placeholder="请输入商品价格" addonAfter="元"></Input>
        </Item>
        <Item label="商品分类" name="categorys" rules={[{ required: true, message: "请输入商品分类" }]} >
          <LazyOptions />
        </Item>
        <Item label="商品图片">
          <PicturesWall/>
        </Item>
        <Item label="商品详情">
          <Input placeholder="请输入商品名称"></Input>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Item>
      </Form>
    </Card>
  )
}