import { Layout, Menu, notification, theme } from 'antd'
import React, { useCallback } from 'react'
import { useContext, useEffect } from 'react'

import PrimaryHeader from '../components/Header/PrimaryHeader'
import { createMenuItemsAdmin } from '../utils/menuItems'
import { SocketContext } from '../services/SocketProvider'

import Logo from '../assets/images/logo.jpg'

const { Footer, Sider, Content } = Layout

function AdminLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const socketConnection = useContext(SocketContext)
    const [numberUnacceptedRooms, setNumberUnacceptRooms] = React.useState()

    const [api, contextHolder] = notification.useNotification()
    const openNotification = useCallback(
        ({ placement, message, description }) => {
            api.info({
                message,
                description,
                placement,
            })
        },
        [api],
    )

    useEffect(() => {
        if (socketConnection) {
            socketConnection.on('new-room-created', (data) => {
                openNotification({
                    placement: 'topRight',
                    message: 'Yêu cầu tạo phòng',
                    description: `Bạn có yêu cầu tạo phòng từ landlord ${data.userInfo.full_name}`,
                })
                setNumberUnacceptRooms(data.numberUnacceptedRooms)
            })
            socketConnection.emit('get-number-request')
            socketConnection.on('number-request', (numberUnacceptedRooms) => {
                setNumberUnacceptRooms(numberUnacceptedRooms)
            })
        }
    }, [socketConnection, openNotification])

    return (
        <Layout hasSider>
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
            <Layout className='ms-[280px]'>
                <PrimaryHeader />
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

export default AdminLayout
