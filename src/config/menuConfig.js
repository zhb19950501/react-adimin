import {
    PaperClipOutlined,
    PushpinOutlined,
    GiftOutlined,
    HomeOutlined,
    UserOutlined,
    TeamOutlined,
    PieChartOutlined,
    LineChartOutlined,
    RiseOutlined,
    BarChartOutlined
} from '@ant-design/icons';


const menuList = [
    {
        title: "首页",
        key: "/home",
        icon: HomeOutlined,
    },
    {
        title: "商品",
        key:"/products",
        icon: GiftOutlined,
        children: [
            {
                title: "品类管理",
                key: "/category",
                icon: PaperClipOutlined,
            },
            {
                title: "商品管理",
                key: "/product",
                icon: PushpinOutlined,
            }
        ]
    },

    {
        title: "用户管理",
        key: "/user",
        icon: UserOutlined,
    },
    {
        title: "角色管理",
        key: "/role",
        icon: TeamOutlined,
    }, {
        title: "图形图表",
        icon: RiseOutlined,
        key: "/charts",
        children: [
            {
                title: "饼状图",
                key: "/charts/pie",
                icon: PieChartOutlined,
            },
            {
                title: "折线图",
                key: "/charts/line",
                icon: LineChartOutlined,
            }, 
            {
                title: "柱状图",
                key: "/charts/bar",
                icon: BarChartOutlined,
            }
        ]
    }



]

export default menuList