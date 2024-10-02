import { Layout, notification, theme } from 'antd'
import React, { useCallback } from 'react'
import { useContext, useEffect } from 'react'

import PrimaryHeader from '../components/Header/PrimaryHeader'
import { SocketContext } from '../services/SocketProvider'
import Sidebar from '../components/Sidebar'

const { Footer, Content } = Layout

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
            console.log('hello')
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
            <Sidebar numberUnacceptedRooms={numberUnacceptedRooms} />
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
                <Footer className='text-center font-semibold italic text-base'>
                    Đồ án 2024 - Nguyễn Trung Hiếu - 0214366 - 66CS1 - HUCE
                </Footer>
            </Layout>
            {contextHolder}
        </Layout>
    )
}

export default AdminLayout
