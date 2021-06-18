import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useHistory, useLocation } from "react-router-dom";

import { reqProductCategoryName } from "../../api"
import LinkButton from "../../components/LinkButton"
import "./index.less"
import { useEffect, useState } from "react";
const Item = List.Item

export default function Detail() {
  const [pName, setPName] = useState("")
  const [cName, setCName] = useState("")
  const history = useHistory()
  const location = useLocation()
  const { pageNum } = location.state
  const { name, desc, detail, price, categoryId, pCategoryId } = location.state.product
  
  console.log("detail")
  useEffect(() => {
    console.log("useEffect")
    const getProductNames = async (pCategoryId,categoryId) => {
      if (pCategoryId === "0") {
        setPName("一级分类")
      } else {
        const pName = await reqProductCategoryName(pCategoryId)
        setPName(pName)
      }
      const cName = await reqProductCategoryName(categoryId)
      setCName(cName)
      
    }
    getProductNames(pCategoryId,categoryId)
  }, [pCategoryId,categoryId])

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
          <span className="right">{pName + "  -->  " + cName}</span>
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