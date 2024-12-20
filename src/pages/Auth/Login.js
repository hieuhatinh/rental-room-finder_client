import { Button, Checkbox, Flex, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
    ArrowLeftOutlined,
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import OAuthLogin from './OAuthLogin'
import LogoLoginRegister from '../../assets/images/logo-login-register.jpg'
import { paths } from '../../utils/pathsRoutes'
import { selectAuth } from '../../store/selector/authSelector'
import { fetchLoginWithUsername } from '../../store/actions/authAction'
import { getTokenFromCookies } from '../../utils/store/token'
import { reStateError } from '../../store/slice/authSlice'

function Login() {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)
    const token = getTokenFromCookies()

    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage()

    // reState
    useEffect(() => {
        if (authState.isError) {
            dispatch(reStateError())
        }
    }, [dispatch, authState.isError])

    // handle login
    const onFinish = (values) => {
        dispatch(fetchLoginWithUsername({ ...values }))
    }

    useEffect(() => {
        if (authState.isError) {
            messageApi
                .open({
                    type: 'error',
                    content: authState.message,
                })
                .then(() => dispatch(reStateError()))
        }
    }, [authState, navigate, token, messageApi, dispatch])

    return (
        <div className='flex overflow-hidden'>
            <Button
                type='link'
                href={paths.tenant.homeTenant}
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
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder='Password'
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
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
                                loading={authState.isLoading}
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
            {contextHolder}
        </div>
    )
}

export default Login
