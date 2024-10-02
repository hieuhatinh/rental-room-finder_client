import { Layout, theme } from 'antd'

import PrimaryHeader from '../components/Header/PrimaryHeader'
import ChatbotUI from '../Chatbot'
import Sidebar from '../components/Sidebar'

const { Footer, Content } = Layout

function DefaultLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className='ms-[200px]'>
                <PrimaryHeader />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    {/* <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
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

            {/* Chatbot */}
            <ChatbotUI />
        </Layout>
    )
}

export default DefaultLayout
