import { Avatar, Dropdown, Layout, Menu, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

import { menuItemsTenant } from '../utils/menuItems'
import Logo from '../assets/images/logo.jpg'
import { selectAuth } from '../store/selector/authSelector'
import { paths } from '../utils/pathsRoutes'
import { fetchLogout } from '../store/actions/authAction'
import StatusIndicator from '../components/StatusIndicator'

const { Sider, Content } = Layout

const items = [
    {
        key: '1',
        label: (
            <Link to={paths.tenant.tenantInfomation}>Thông tin cá nhân</Link>
        ),
    },
]

function ChatAppLayout({ children }) {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)
    const navigate = useNavigate()

    const logout = () => {
        dispatch(fetchLogout())
        navigate(paths.tenant.homeTenant)
    }

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
                    items={menuItemsTenant}
                />
                <div className='fixed bottom-5 translate-x-[50%] flex flex-col justify-center items-center flex-1'>
                    <StatusIndicator isOnline={authState.isOnline}>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement='topRight'
                            arrow
                            trigger={['click']}
                        >
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
                        </Dropdown>
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
