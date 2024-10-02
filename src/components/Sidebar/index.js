import { Layout, Menu } from 'antd'

import { getUserInfoFromLocalStorage } from '../../utils/store/localStorage'
import roles from '../../utils/roles'
import {
    createMenuItemsAdmin,
    menuItemsLandlord,
    menuItemsTenant,
} from '../../utils/menuItems'
import Logo from '../../assets/images/logo.jpg'

const { Sider } = Layout

const Sidebar = ({ numberUnacceptedRooms }) => {
    const userInfo = getUserInfoFromLocalStorage()

    return userInfo?.role === roles.landlord ? (
        <Sider style={siderStyle} width={250} className='flex flex-col'>
            <div className='flex items-center justify-center h-[150px]'>
                <img
                    src={Logo}
                    alt='logo-website'
                    width={100}
                    className='rounded-lg'
                />
            </div>

            <Menu
                theme='dark'
                defaultSelectedKeys={[window.location.pathname]}
                mode='inline'
                items={menuItemsLandlord}
            />
        </Sider>
    ) : userInfo?.role === roles.admin ? (
        <Sider style={siderStyle} width={280} className='flex flex-col'>
            <div className='flex items-center justify-center h-[150px]'>
                <img
                    src={Logo}
                    alt='logo-website'
                    width={100}
                    className='rounded-lg'
                />
            </div>
            <Menu
                theme='dark'
                defaultSelectedKeys={[window.location.pathname]}
                mode='inline'
                items={createMenuItemsAdmin({
                    numberRequest: numberUnacceptedRooms,
                })}
            />
        </Sider>
    ) : (
        <Sider style={siderStyle}>
            <div className='flex items-center justify-center h-[150px]'>
                <img
                    src={Logo}
                    alt='logo-website'
                    width={100}
                    className='rounded-lg'
                />
            </div>
            <Menu
                theme='dark'
                defaultSelectedKeys={[window.location.pathname]}
                mode='inline'
                items={menuItemsTenant}
            />
        </Sider>
    )
}

const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
}

export default Sidebar