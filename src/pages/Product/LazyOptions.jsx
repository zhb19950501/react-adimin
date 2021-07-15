import { useState, useEffect,useRef } from "react"
import {Cascader} from "antd"
import { reqCategory } from "../../api"

export default function LazyOptions (props) {

    // option为级联菜单内容的数组对象
    const [options, setOptions] = useState([]);
    // 设置默认值
    const [defaultValue, setDefaultValue] = useState([])

    // 根据收到的Categorys数据生成级联列表需要的options
    const getOptions = async (categorys) => {
      const options = await Promise.all(categorys.map(async (c) => {
        const childCategorys = await reqCategory(c._id)
        const isLeaf = childCategorys.length === 0 ? true : false
        return {
          value: c._id,
          label: c.name,
          isLeaf
        }
      }))
      return options
    }
    // 级联菜单初始数据列表
    const [pCategoryId, categoryId] = props.value || []
    const valueRef = useRef([pCategoryId, categoryId])
    useEffect(() => {
      const [pCategoryId, categoryId] = valueRef.current
      // 初始化级联列表Option对象
      const getInitOptionList = async (pCategoryId="0", categoryId) => {
        // 获取一级列表数据
        const categorys = await reqCategory("0")
        // 将一级列表数据整理成级联列表需要的Option对象
        const options = await getOptions(categorys)
        // 如果是更新商品时商品为一级分类
        if(pCategoryId==="0"){
          setOptions(options)
          if(categoryId){
            setDefaultValue([categoryId])
          }
        }else{
          // 如果为二级分类商品
          const secondCategorys = await reqCategory(pCategoryId)
          const secondOptions = await getOptions(secondCategorys)
          options.map((o)=>{
            if(o.value === pCategoryId){
              return {...o,children:secondOptions}
            }
            return o
          })
          console.log("effect",options)
          setOptions(options)
          setDefaultValue([pCategoryId,categoryId])
        }
      }
      getInitOptionList(pCategoryId, categoryId)
    }, [valueRef])


    const loadData = async selectedOptions => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      // 根据选中的菜单项获取下一级菜单
      const childCategorys = await reqCategory(targetOption.value)
      targetOption.loading = false;
      const childOptions = await getOptions(childCategorys)
      targetOption.children = childOptions
      console.log("loadData",options)
      setOptions([...options])
    }
    // 级联菜单选择变化时的回调
    const onChange = (value) => {
      // 回传给表单选择的分类值[categoryId,parentId]
      props.onChange([value[value.length - 1], value[value.length - 2] || 0])
      setDefaultValue(value)
    }

    console.log("组件重新渲染",options)
    return <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect value={[...defaultValue]} />;
  };