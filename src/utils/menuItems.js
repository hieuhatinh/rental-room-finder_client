import {
    ApartmentOutlined,
    BellOutlined,
    HomeOutlined,
    LineChartOutlined,
    WechatOutlined,
} from '@ant-design/icons'

import { paths } from './pathsRoutes'

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const menuItemsTenant = [
    getItem('Trang chủ', '1', <HomeOutlined />),
    getItem('Chat', '2', <WechatOutlined />),
    getItem('Thông báo', '3', <BellOutlined />),
]

const menuItemsLandlord = [
    getItem('Trang chủ', paths.landlord.homeLandlord, <HomeOutlined />),
    getItem('Chat', '2', <WechatOutlined />),
    getItem('Thông báo', '3', <BellOutlined />),
    getItem('Quản trị thông tin', 'sub1', <ApartmentOutlined />, [
        getItem('Quản lý phòng trọ', '4'),
        getItem('Thông tin người thuê', '5'),
    ]),
    getItem('Thống kê', 'sub2', <LineChartOutlined />, [
        getItem('Doanh thu', '6'),
        getItem('Phòng trọ', '7'),
    ]),
]

export { menuItemsTenant, menuItemsLandlord }
