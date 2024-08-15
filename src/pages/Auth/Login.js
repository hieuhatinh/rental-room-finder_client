import { Button, Checkbox, Flex, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import {
    ArrowLeftOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons'

import { paths } from '../../routes'
import OAuthLogin from './OAuthLogin'
import LogoLoginRegister from '../../assets/images/logo-login-register.jpg'

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const user = await axios.post(
                'http://localhost:5000/auth/login/tenant',
                {
                    username: values.username,
                    password: values.password,
                },
                { withCredentials: true },
            )
            setLoading(false)

            if (user.data) {
                navigate('/')
            }
        } catch (error) {
            setLoading(false)
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className='flex overflow-hidden'>
            <Button
                type='link'
                href={paths.homeTenant}
                icon={<ArrowLeftOutlined />}
                className='relative top-5 left-5'
            >
                Về trang chủ
            </Button>
            <div className='flex flex-1 h-screen w-screen flex-col items-center justify-center'>
                <div className='bg-white shadow-lg p-5 rounded-xl'>
                    <h1 className='font-serif italic font-semibold text-xl text-center mb-5'>
                        Đăng nhập
                    </h1>
                    <Form
                        name='login'
                        onFinish={onFinish}
                        className='w-[400px]'
                    >
                        <Form.Item
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder='Username'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type='password'
                                placeholder='Password'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Flex justify='space-between' align='center'>
                                <Form.Item
                                    name='remember'
                                    valuePropName='checked'
                                    noStyle
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Link className='font-semibold text-indigo-600 hover:text-indigo-500'>
                                    Quên mật khẩu?
                                </Link>
                            </Flex>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                block
                                type='primary'
                                htmlType='submit'
                                className='mb-2 font-semibold bg-indigo-600 hover:bg-indigo-500'
                            >
                                Đăng nhập
                            </Button>
                            <p>
                                Bạn chưa có tài khoản?
                                <Link
                                    to={paths.register}
                                    className='font-semibold text-indigo-600 hover:text-indigo-500 ml-2'
                                >
                                    Đăng kí ngay
                                </Link>
                            </p>
                        </Form.Item>
                    </Form>
                    <OAuthLogin />
                </div>
            </div>
            <div className='flex-1 h-screen w-screen'>
                <img src={LogoLoginRegister} alt='logo-login-register' />
            </div>
        </div>
    )
}

export default Login
