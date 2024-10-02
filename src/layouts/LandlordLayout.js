import { useCallback, useContext, useEffect } from 'react'
import { Layout, notification, theme } from 'antd'

import PrimaryHeader from '../components/Header/PrimaryHeader'
import { SocketContext } from '../services/SocketProvider'
import Sidebar from '../components/Sidebar'

const { Footer, Content } = Layout

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
            <Sidebar />
            <Layout className='ms-[250px]'>
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

export default LandlordLayout
