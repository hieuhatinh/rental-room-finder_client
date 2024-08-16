import {
    ApartmentOutlined,
    BellOutlined,
    HomeOutlined,
    LineChartOutlined,
    WechatOutlined,
} from '@ant-design/icons'

import { paths } from './pathsRoutes'
import { Link } from 'react-router-dom'

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const menuItemsTenant = [
    getItem(
        <Link
            to={paths.tenant.homeTenant}
            className='text-current hover:text-current'
        >
            Trang chủ
        </Link>,
        paths.tenant.homeTenant,
        <HomeOutlined />,
    ),
    getItem(
        <Link
            to={paths.tenant.homeTenant}
            className='text-current hover:text-current'
        >
            Chat
        </Link>,
        '2',
        <WechatOutlined />,
    ),
    getItem(
        <Link
            to={paths.tenant.homeTenant}
            className='text-current hover:text-current'
        >
            Thông báo
        </Link>,
        '3',
        <BellOutlined />,
    ),
]

const menuItemsLandlord = [
    getItem(
        <Link
            to={paths.landlord.homeLandlord}
            className='text-current hover:text-current'
        >
            Trang chủ
        </Link>,
        '1',
        <HomeOutlined />,
    ),
    getItem(
        <Link
            to={paths.landlord.homeLandlord}
            className='text-current hover:text-current'
        >
            Chat
        </Link>,
        '2',
        <WechatOutlined />,
    ),
    getItem(
        <Link
            to={paths.landlord.homeLandlord}
            className='text-current hover:text-current'
        >
            Thông báo
        </Link>,
        '3',
        <BellOutlined />,
    ),
    getItem('Quản trị thông tin', 'sub1', <ApartmentOutlined />, [
        getItem(
            <Link
                to={paths.landlord.homeLandlord}
                className='text-current hover:text-current'
            >
                Quản lý phòng trọ
            </Link>,
            '4',
        ),
        getItem(
            <Link
                to={paths.landlord.homeLandlord}
                className='text-current hover:text-current'
            >
                Thông tin người thuê
            </Link>,
            '5',
        ),
    ]),
    getItem('Thống kê', 'sub2', <LineChartOutlined />, [
        getItem(
            <Link
                to={paths.landlord.homeLandlord}
                className='text-current hover:text-current'
            >
                Doanh thu
            </Link>,
            '6',
        ),
        getItem(
            <Link
                to={paths.landlord.homeLandlord}
                className='text-current hover:text-current'
            >
                Phòng trọ
            </Link>,
            '7',
        ),
    ]),
]

export { menuItemsTenant, menuItemsLandlord }