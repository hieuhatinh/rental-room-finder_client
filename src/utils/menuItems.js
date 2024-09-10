import {
    ApartmentOutlined,
    AuditOutlined,
    BellOutlined,
    HomeOutlined,
    LineChartOutlined,
    WechatOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

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
            to={paths.shared.chatApp}
            className='text-current hover:text-current'
        >
            Chat
        </Link>,
        paths.shared.chatApp,
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
        paths.landlord.homeLandlord,
        <HomeOutlined />,
    ),
    getItem(
        <Link
            to={paths.shared.chatApp}
            className='text-current hover:text-current'
        >
            Chat
        </Link>,
        paths.shared.chatApp,
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
                to={paths.landlord.roomManagement}
                className='text-current hover:text-current'
            >
                Quản lý phòng trọ
            </Link>,
            paths.landlord.roomManagement,
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

const menuItemsAdmin = [
    getItem(
        <Link
            to={paths.admin.homeAdmin}
            className='text-current hover:text-current'
        >
            Trang chủ
        </Link>,
        paths.admin.homeAdmin,
        <HomeOutlined />,
    ),
    getItem(
        <Link
            to={paths.landlord.homeLandlord}
            className='text-current hover:text-current'
        >
            Thông báo
        </Link>,
        '2',
        <BellOutlined />,
    ),
    getItem(
        <Link
            to={paths.landlord.homeLandlord}
            className='text-current hover:text-current'
        >
            Yêu cầu phê duyệt
        </Link>,
        '3',
        <AuditOutlined />,
    ),
    getItem('Quản trị thông tin', 'sub1', <ApartmentOutlined />, [
        getItem(
            <Link
                to={paths.admin.manageLandlords}
                className='text-current hover:text-current'
            >
                Quản lý thông tin chủ phòng
            </Link>,
            paths.admin.manageLandlords,
        ),
        getItem(
            <Link
                to={paths.landlord.homeLandlord}
                className='text-current hover:text-current'
            >
                Thông tin phòng
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

export { menuItemsTenant, menuItemsLandlord, menuItemsAdmin }
