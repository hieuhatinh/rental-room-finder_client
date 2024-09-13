import { Layout, Menu, theme } from 'antd'

import { menuItemsLandlord } from '../utils/menuItems'
import PrimaryHeader from '../components/Header/PrimaryHeader'

import Logo from '../assets/images/logo.jpg'
const { Footer, Sider, Content } = Layout

function LandlordLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

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
