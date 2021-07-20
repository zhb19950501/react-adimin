import { useEffect, useState } from "react"
import { useLocation,useHistory } from "react-router"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import LinkButton from "../../components/LinkButton"
import memoryUtils from "../../utils/memoryUtils"
import localStoreUtils from "../../utils/localStoreUtils"
import { reqWeather } from "../../api/"
import { formateDate } from "../../utils/dateUtils"
import image from "../../assets/images/login-logo.png"
import "./index.less"
import menuList from "../../config/menuConfig"


export default function Header() {
    const [province, setProvince] = useState()
    const [weather, setWeather] = useState()
    const [date, setDate] = useState()
    const [headerName, setHeaderName] = useState()
    const username = memoryUtils.user.username

    // 只有初次渲染的时候执行一次的副作用~
    useEffect(() => {
        // 获取省份和天气数据并更新状态
        const getDatas = async () => {
            const { province, weather } = await reqWeather()
            setProvince(province)
            setWeather(weather)
        }
        getDatas()

        // 获取时间并开启定时器
        const time = setInterval(() => {
            const date = new Date()
            setDate(formateDate(date))
        }, 1000);
        return()=>{
            clearInterval(time)
        }

    }, [])

    // 标题随点击更新，但是不知道该放在什么位置才能让它不要受到定时器的影响而一直重算~哇，可以把pathName做成放到useeffect钩子里~解决了这个问题
    const Location = useLocation()
    const pathname = Location.pathname
    useEffect(() => {
        const getHeaderName = () => {
            const findName = (menuList) => {
                menuList.some((menuEle) => {
                    let flag = false
                    if (menuEle.key === pathname || pathname.indexOf(menuEle.key) === 0) {
                        const title = menuEle.title
                        setHeaderName(title)
                        flag = true
                    } else if (menuEle.children) {
                        findName(menuEle.children)
                    }
                    return flag
                })
            }
            findName(menuList)
        }
        getHeaderName()
    }, [pathname])

    // 退出功能的实现
    const History = useHistory()
    const logOut=()=>{
        Modal.confirm({
            title: '确定退出登录吗?',
            icon: <ExclamationCircleOutlined />,
            content: `当前用户为${username}`,
            okText:"确认",
            cancelText:"取消",

            onOk() {
                localStoreUtils.removeUser()
                memoryUtils.user={}
                History.replace("/login")
            }

          })
    }


    return (
        <div className="header">
            <div className="header-top">
                <span>欢迎，{username}</span>
                <LinkButton onClick={logOut}>退出</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">
                    <span>{headerName}</span>
                </div>
                <div className="header-bottom-right">
                    <span>{date}</span>
                    <img src={image} alt="天气" />
                    <span className="city">{province}</span>
                    <span className="weather">{weather}</span>
                </div>
            </div>
        </div>
    )
}