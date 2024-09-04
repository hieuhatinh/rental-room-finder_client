import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Flex, Space, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchLogout } from '../../store/actions/authAction'
import { paths } from '../../utils/pathsRoutes'
import { selectAuth } from '../../store/selector/authSelector'
import StatusIndicator from '../StatusIndicator'

const AdminHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authState = useSelector(selectAuth)

    const logout = () => {
        dispatch(fetchLogout())
        navigate(paths.tenant.homeTenant)
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
            <div />
            <div className='items-center justify-center'>
                <h1 className='uppercase font-semibold text-indigo-600 text-2xl italic font-serif'>
                    RENTAL ROOM FINDER
                </h1>
                <span className='block text-center text-orange-400 italic text-base font-serif uppercase'>
                    {authState?.userInfo?.role}
                </span>
            </div>
            <Flex gap={15}>
                <div className='flex flex-col items-end'>
                    <span className='block'>Chào mừng quay trở lại,</span>
                    <span className='block'>
                        {authState?.userInfo?.full_name ||
                            authState?.userInfo?.username}
                    </span>
                </div>

                <Space direction='vertical'>
                    <Space wrap>
                        <StatusIndicator isOnline={authState.isOnline}>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement='bottomRight'
                                trigger={['click']}
                            >
                                <Tooltip
                                    title='Account'
                                    placement='bottomRight'
                                    color='#f9fafb'
                                    overlayInnerStyle={{ color: 'black' }}
                                >
                                    <Avatar
                                        src={authState?.userInfo.avatar}
                                        icon={
                                            !authState.userInfo.avatar && (
                                                <UserOutlined />
                                            )
                                        }
                                        size={48}
                                        className='cursor-pointer'
                                    />
                                </Tooltip>
                            </Dropdown>
                        </StatusIndicator>
                    </Space>
                </Space>
            </Flex>
        </div>
    )
}

export default AdminHeader
