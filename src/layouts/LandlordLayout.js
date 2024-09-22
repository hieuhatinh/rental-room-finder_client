import { Layout, Menu, notification, theme } from 'antd'

import { menuItemsLandlord } from '../utils/menuItems'
import AdminHeader from '../components/Header/AdminHeader'

import Logo from '../assets/images/logo.jpg'
import { useCallback, useContext, useEffect } from 'react'
import { SocketContext } from '../services/SocketProvider'
const { Footer, Sider, Content } = Layout

function LandlordLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const socketConnection = useContext(SocketContext)
    const [api, contextHolder] = notification.useNotification()
    const openNotification = useCallback(
        ({ placement, message, description }) => {
            api.success({
                message,
                description,
                placement,
            })
        },
        [api],
    )

    useEffect(() => {
        if (socketConnection) {
            socketConnection.on('accept-request', () => {
                openNotification({
                    placement: 'topRight',
                    message: 'Yêu cầu tạo phòng đã được chấp nhận',
                    description: `yêu cầu tạo phòng của bạn đã được chấp nhận`,
                })
            })
        }
    }, [socketConnection, openNotification])

    return (
        <Layout hasSider>
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
            <Layout className='ms-[250px]'>
                <AdminHeader />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            margin: '16px 0',
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>

            {contextHolder}
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

export default LandlordLayout
