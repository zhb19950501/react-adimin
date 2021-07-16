import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useHistory, useLocation } from "react-router-dom";

import { reqProductCategoryName } from "../../api"
import LinkButton from "../../components/LinkButton"
import "./index.less"
import { useEffect, useReducer } from "react";
const Item = List.Item





export default function Detail() {
  const history = useHistory()
  const location = useLocation()
  const { pageNum } = location.state
  const { name, desc, detail, price, categoryId, pCategoryId } = location.state.product

  const reducer = (state, action) => {
    switch (action.type) {
      case "NOT_FIRST_LEVEL":{
        const{pName,cName} = action
        return { ...state, pName, cName }
      }
      case "FIRST_LEVEL":{
        const pName = "一级分类"
        const{cName} = action
        return { ...state, pName, cName }
      }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, { pName: "", cName: "" })
  const { cName, pName } = state
  console.log("@@", state)


  useEffect(() => {
    // console.log("useEffect")
    const getCategoryNames = async () => {
      const cName = await reqProductCategoryName(categoryId)
      if (pCategoryId === "0") {
        dispatch({ type: "FIRST_LEVEL",cName })
      } else {
        const pName = await reqProductCategoryName(pCategoryId)
        dispatch({ type: "NOT_FIRST_LEVEL", pName, cName })
      }
    }
    getCategoryNames()
  }, [categoryId, pCategoryId])
  // console.log(location)

  return (
    <Card
      title={
        <span>
          <LinkButton onClick={() => { history.push("/product", { pageNum }) }} style={{ marginRight: 10 }}>
            <ArrowLeftOutlined />
          </LinkButton>
          <span>商品详情</span>
        </span>
      }
      className="product-detail"
    >
      <List

      >
        <Item className="list-item">
          <span className="left">商品名称</span>
          <span className="right">{name}</span>
        </Item>
        <Item className="list-item">
          <span className="left">商品描述</span>
          <span className="right">{desc}</span>
        </Item>
        <Item className="list-item">
          <span className="left">商品价格</span>
          <span className="right">{price}</span>
        </Item>
        <Item className="list-item">
          <span className="left">所属分类</span>
          <span className="right">{pName + '---->' + cName}</span>
        </Item>
        <Item className="list-item">
          <span className="left">商品图片</span>
          <span className="right">图片</span>
        </Item>
        <Item className="list-item">
          <span className="left">商品详情</span>
          <span className="right" dangerouslySetInnerHTML={{ __html: detail }}></span>
        </Item>
      </List>
    </Card>
  )
}