
import image from "../../assets/images/login-logo.png"
import "./index.less"

export default function Header(){
    return (
        <div className="header">
            <div className="header-top">
                <span>欢迎，admin</span>
                <button>退出</button>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">
                    <span>首页</span>
                </div>
                <div className="header-bottom-right">
                    <span>2021-6-7</span>
                    <img src={image} alt="天气" />
                    <span>晴</span>
                </div>
            </div>
        </div>
    )
}