import { useContext, useEffect } from 'react'
import { Layout, notification, theme } from 'antd'
import { useSelector } from 'react-redux'

import PrimaryHeader from '../components/Header/PrimaryHeader'
import { SocketContext } from '../services/SocketProvider'
import Sidebar from '../components/Sidebar'
import { selectAuth } from '../store/selector/authSelector'
import LogoHUCE from '../assets/images/logo-huce.jpg'

const { Footer, Content } = Layout

function LandlordLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const socketConnection = useContext(SocketContext)
    const [api, contextHolder] = notification.useNotification()
    const authState = useSelector(selectAuth)

    useEffect(() => {
        if (socketConnection) {
            socketConnection.on('accept-request', ({ id_landlord }) => {
                if (id_landlord === authState.userInfo.id_user) {
                    api.success({
                        placement: 'topRight',
                        message: 'Yêu cầu tạo phòng đã được chấp nhận',
                        description: `yêu cầu tạo phòng của bạn đã được chấp nhận`,
                    })
                }
            })

            socketConnection.on('reject-request', ({ id_landlord }) => {
                if (id_landlord === authState.userInfo.id_user) {
                    console.log('hi')
                    api.error({
                        placement: 'topRight',
                        message: 'Yêu cầu tạo phòng bị từ chối',
                        description: `Bạn có 1 yêu cầu sửa đổi thông tin phòng. Vào thông báo để xem chi tiết.`,
                    })
                }
            })

            socketConnection.on('accept-amentity', (data) => {
                if (
                    data.idLandlords.some(
                        (item) => authState.userInfo.id_user === item,
                    )
                ) {
                    api.success({
                        placement: 'topRight',
                        message: `Yêu cầu tạo tiện ích ${data.amentity.amentity_name} đã được chấp nhận`,
                        description: ``,
                    })
                }
            })

            socketConnection.on('refuse-amentity', (data) => {
                if (
                    data.idLandlords.some(
                        (item) => authState.userInfo.id_user === item,
                    )
                ) {
                    api.success({
                        placement: 'topRight',
                        message: `Yêu cầu tạo tiện ích ${data.amentity.amentity_name} đã bị từ chối`,
                        description: `Mọi thông tin tiện ích liên quan đến phòng trọ đã được hệ thống tự động xóa. Quá trình này chỉ xóa tiện ích trong yêu cầu tạo phòng trọ của bạn, ngoài ra không ảnh hưởng gì khác`,
                    })
                }
            })

            return () => {
                socketConnection.off('accept-request')
                socketConnection.off('accept-amentity')
                socketConnection.off('refuse-amentity')
                socketConnection.off('reject-request')
            }
        }
    }, [socketConnection, api, authState])

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

export default LandlordLayout
