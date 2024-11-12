import { Layout, notification, theme } from 'antd'
import React from 'react'
import { useContext, useEffect } from 'react'

import PrimaryHeader from '../components/Header/PrimaryHeader'
import { SocketContext } from '../services/SocketProvider'
import Sidebar from '../components/Sidebar'
import LogoHUCE from '../assets/images/logo-huce.jpg'

const { Footer, Content } = Layout

function AdminLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const socketConnection = useContext(SocketContext)
    const [numberUnacceptedRooms, setNumberUnacceptRooms] = React.useState()
    const [numberNewAmentity, setNumberNewAmentity] = React.useState()

    const [api, contextHolder] = notification.useNotification()

    useEffect(() => {
        if (socketConnection) {
            // socket new room
            socketConnection.on('new-room-created', (data) => {
                api.info({
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

            // socket new amentity
            socketConnection.on('new-amentity', (data) => {
                api.info({
                    placement: 'topRight',
                    message: 'Yêu cầu thêm tiện ích',
                    description: `Bạn có yêu cầu thêm tiện ích từ landlord ${data.userInfo.full_name}. Xem chi tiết tại mục Quản lý tiện ích -> tiện ích mới`,
                })
                setNumberNewAmentity(data.numberNewAmentity)
            })

            socketConnection.emit('get-number-new-amentity')
            socketConnection.on('number-new-amentity', (numberNewAmentity) => {
                setNumberNewAmentity(numberNewAmentity)
            })

            return () => {
                socketConnection.off('new-amentity')
                socketConnection.off('number-new-amentity')
                socketConnection.off('new-room-created')
                socketConnection.off('number-request')
            }
        }
    }, [socketConnection, api])

    return (
        <Layout hasSider>
            <Sidebar
                numberUnacceptedRooms={numberUnacceptedRooms}
                numberNewAmentity={numberNewAmentity}
            />
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
                <Footer className='flex items-center justify-center gap-3 font-semibold italic text-base'>
                    <img src={LogoHUCE} alt='logo huce' className='h-8 w-8' />
                    <span>
                        Đồ án 2024 - Nguyễn Trung Hiếu - 0214366 - 66CS1 - HUCE
                    </span>
                </Footer>
            </Layout>
            {contextHolder}
        </Layout>
    )
}

export default AdminLayout
