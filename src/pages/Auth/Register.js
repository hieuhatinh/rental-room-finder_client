import { Button, Form, Input, message } from 'antd'
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
import { fetchRegisterWithUsername } from '../../store/actions/authAction'
import { selectAuth } from '../../store/selector/authSelector'
import { reStateError } from '../../store/slice/authSlice'

function Register() {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)

    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage()

    const onFinish = (values) => {
        dispatch(fetchRegisterWithUsername({ ...values }))
    }

    // reState
    useEffect(() => {
        dispatch(reStateError())
    }, [authState.isError])

    // handle register
    useEffect(() => {
        if (authState.isSuccess) {
            navigate(paths.login)
        } else if (authState.isError) {
            messageApi
                .open({
                    type: 'error',
                    content: authState.message,
                })
                .then(dispatch(reStateError()))
        }
    }, [authState, navigate, messageApi, dispatch])

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
                        Đăng ký
                    </h1>
                    <Form
                        name='Register'
                        onFinish={onFinish}
                        className='w-[400px]'
                    >
                        <Form.Item
                            name='username'
                            hasFeedback
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
                            hasFeedback
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

                        <Form.Item
                            name='re-password'
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Re-Password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(
                                            new Error('Mật khẩu không khớp'),
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder='Re-Password'
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
                            <Button
                                block
                                loading={authState.isLoading}
                                type='primary'
                                htmlType='submit'
                                className='mb-2 font-semibold bg-indigo-600 hover:bg-indigo-500'
                            >
                                Đăng Ký
                            </Button>
                            <p>
                                Bạn đã có tài khoản?
                                <Link
                                    to={paths.login}
                                    className='font-semibold text-indigo-600 hover:text-indigo-500 ml-2'
                                >
                                    Đăng nhập ngay
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

export default Register
