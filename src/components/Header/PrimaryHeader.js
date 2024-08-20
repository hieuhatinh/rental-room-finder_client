import { useEffect } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Flex, Form, Input, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchLogout } from '../../store/actions/authAction'
import { paths } from '../../utils/pathsRoutes'
import { selectAuth } from '../../store/selector/authSelector'
import { getInfo } from '../../store/slice/authSlice'

const PrimaryHeader = () => {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)

    useEffect(() => {
        dispatch(getInfo())
    }, [dispatch])

    const logout = () => {
        dispatch(fetchLogout())
    }

    const items = [
        {
            key: '1',
            label: <Link to='/infomation'>Thông tin cá nhân</Link>,
        },
        {
            key: '2',
            label: <button onClick={logout}>Đăng xuất</button>,
        },
    ]

    return (
        <div className='bg-white shadow-md flex items-center justify-around h-[100px]'>
            <Flex gap={10}>
                <Form className='flex'>
                    <Input.Search
                        placeholder='Tìm trọ theo khu vực bạn muốn'
                        enterButton='Tìm kiếm'
                        className='w-[330px]'
                    />
                </Form>
            </Flex>
            <div className='items-center justify-center'>
                <h1 className='uppercase font-semibold text-indigo-600 text-2xl italic font-serif'>
                    RENTAL ROOM FINDER
                </h1>
                <span className='block text-center text-orange-400 italic text-base font-serif'>
                    Tìm trọ theo nhu cầu của bạn
                </span>
            </div>
            {authState.userInfo && authState.token ? (
                <Flex gap={15}>
                    <div className='flex flex-col items-end'>
                        <span className='block'>Chào mừng quay trở lại,</span>
                        <span className='block'>
                            {authState.userInfo.full_name ||
                                authState.userInfo.username}
                        </span>
                    </div>

                    <Space direction='vertical'>
                        <Space wrap>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement='bottomRight'
                                arrow
                            >
                                {authState.userInfo.avatar ? (
                                    <img
                                        src={authState.userInfo.avatar}
                                        alt={`avatar-${
                                            authState.userInfo.username ||
                                            authState.userInfo.full_name
                                        }`}
                                        className='rounded-full w-[40px] hover:cursor-pointer'
                                    />
                                ) : (
                                    <Avatar
                                        icon={<UserOutlined />}
                                        size={48}
                                        className='cursor-pointer'
                                    />
                                )}
                            </Dropdown>
                        </Space>
                    </Space>
                </Flex>
            ) : (
                <Flex gap={20}>
                    <Button className='bg-red-400 min-w-[100px]' type='primary'>
                        <Link
                            to={paths.login}
                            className='text-current hover:text-current'
                        >
                            Đăng nhập
                        </Link>
                    </Button>
                    <Button
                        className='bg-green-400 min-w-[100px]'
                        type='primary'
                    >
                        <Link
                            to={paths.register}
                            className='text-current hover:text-current'
                        >
                            Đăng ký
                        </Link>
                    </Button>
                </Flex>
            )}
        </div>
    )
}

export default PrimaryHeader
