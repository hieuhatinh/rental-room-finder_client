import { Button, Form, Layout, message, Modal, Radio, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import PrimaryHeader from '../components/Header/PrimaryHeader'
import ChatbotUI from '../Chatbot'
import Sidebar from '../components/Sidebar'
import LogoHUCE from '../assets/images/logo-huce.jpg'
import { selectAuth } from '../store/selector/authSelector'
import roles from '../utils/roles'
import { fetchUpdateInfomation } from '../store/actions/authAction'

const { Footer, Content } = Layout

function DefaultLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)
    const [gender, setGender] = useState('male')
    const [messageApi, contextHolder] = message.useMessage()

    const onFinish = (values) => {
        dispatch(fetchUpdateInfomation({ ...values })).then((result) => {
            if (result.payload?.success) {
                messageApi.open({
                    type: 'success',
                    content: result.payload?.message,
                })
            } else if (result.payload?.error) {
                messageApi.open({
                    type: 'error',
                    content: result.payload?.message,
                })
            }
        })
    }

    const onChangeGender = (e) => {
        setGender(e.target.value)
    }

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

                <Footer className='flex items-center justify-center gap-3 font-semibold italic text-base'>
                    <img src={LogoHUCE} alt='logo huce' className='h-8 w-8' />
                    <span>
                        Đồ án 2024 - Nguyễn Trung Hiếu - 0214366 - 66CS1 - HUCE
                    </span>
                </Footer>
            </Layout>

            {/* Chatbot */}
            <ChatbotUI />

            {authState?.userInfo?.role === roles.tenant &&
                authState?.userInfo?.gender === 'unknown' && (
                    <Modal
                        zIndex={100}
                        closable={false}
                        closeIcon={null}
                        title='Xác nhận giới tính'
                        footer={null}
                        open={
                            authState?.userInfo?.role === roles.tenant &&
                            authState?.userInfo?.gender === 'unknown'
                        }
                    >
                        <Form
                            name='Register'
                            onFinish={onFinish}
                            className='flex flex-col'
                        >
                            <Form.Item
                                name='gender'
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Gender!',
                                    },
                                ]}
                            >
                                <Radio.Group
                                    onChange={onChangeGender}
                                    value={gender}
                                >
                                    <Radio value='male'>Nam</Radio>
                                    <Radio value='female'>Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    block
                                    loading={authState.isLoading}
                                    type='primary'
                                    htmlType='submit'
                                    className='mb-2 font-semibold bg-indigo-600 hover:bg-indigo-500'
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                )}

            {contextHolder}
        </Layout>
    )
}

export default DefaultLayout
