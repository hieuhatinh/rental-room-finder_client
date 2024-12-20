import { useEffect, useState } from 'react'
import { Avatar, Layout, Menu, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import { menuItemsLandlord, menuItemsTenant } from '../utils/menuItems'
import Logo from '../assets/images/logo.jpg'
import { selectAuth } from '../store/selector/authSelector'
import { paths } from '../utils/pathsRoutes'
import { fetchLogout } from '../store/actions/authAction'
import StatusIndicator from '../components/StatusIndicator'
import roles from '../utils/roles'

const { Sider, Content } = Layout

function ChatAppLayout({ children }) {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)
    const navigate = useNavigate()
    const [menu, setMenu] = useState()

    const logout = () => {
        dispatch(fetchLogout())
        navigate(paths.tenant.homeTenant)
    }

    useEffect(() => {
        switch (authState?.userInfo.role) {
            case roles.landlord:
                setMenu(menuItemsLandlord)
                break
            case roles.tenant:
                setMenu(menuItemsTenant)
                break
            default:
                setMenu(menuItemsTenant)
                break
        }
    }, [authState?.userInfo.role])

    return (
        <Layout hasSider>
            <Sider style={siderStyle} collapsed={true}>
                <div className='flex items-center justify-center h-[100px]'>
                    <img
                        src={Logo}
                        alt='logo-website'
                        width={50}
                        className='rounded-lg'
                    />
                </div>
                <Menu
                    theme='dark'
                    defaultSelectedKeys={[window.location.pathname]}
                    mode='inline'
                    items={menu}
                />
                <div className='fixed bottom-5 translate-x-[50%] flex flex-col justify-center items-center flex-1'>
                    <StatusIndicator isOnline={authState.isOnline}>
                        <Tooltip title={`${authState?.userInfo.full_name}`}>
                            <Avatar
                                src={authState?.userInfo.avatar}
                                icon={
                                    !authState?.userInfo.avatar && (
                                        <UserOutlined />
                                    )
                                }
                                size={40}
                                className='cursor-pointer'
                            />
                        </Tooltip>
                    </StatusIndicator>
                    <Tooltip
                        title='Đăng xuất'
                        color='white'
                        overlayInnerStyle={{ color: 'black' }}
                        placement='rightTop'
                    >
                        <LogoutOutlined
                            className='text-white font-extrabold text-xl mt-3 cursor-pointer py-2'
                            onClick={logout}
                        />
                    </Tooltip>
                </div>
            </Sider>
            <Layout className='ms-[80px]'>
                <Content>{children}</Content>
            </Layout>
        </Layout>
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

export default ChatAppLayout
