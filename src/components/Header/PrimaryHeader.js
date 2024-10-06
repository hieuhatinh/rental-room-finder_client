import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Flex, Space, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchLogout } from '../../store/actions/authAction'
import { paths } from '../../utils/pathsRoutes'
import { selectAuth } from '../../store/selector/authSelector'
import StatusIndicator from '../StatusIndicator'
import roles from '../../utils/roles'
import Search from '../Tenant/Search'

const PrimaryHeader = () => {
    const dispatch = useDispatch()
    const authState = useSelector(selectAuth)
    const navigate = useNavigate()

    const logout = () => {
        dispatch(fetchLogout())
        navigate(paths.tenant.homeTenant)
    }

    const items =
        authState?.userInfo?.role === roles.tenant
            ? [
                  {
                      key: '1',
                      label: (
                          <Link to={paths.tenant.tenantInfomation}>
                              Thông tin cá nhân
                          </Link>
                      ),
                  },
                  {
                      key: '2',
                      label: <button onClick={logout}>Đăng xuất</button>,
                  },
              ]
            : [
                  {
                      key: '2',
                      label: <button onClick={logout}>Đăng xuất</button>,
                  },
              ]

    return (
        <div className='bg-white shadow-md flex items-center justify-around h-[100px]'>
            {authState?.token &&
            (authState?.userInfo?.role === roles.admin ||
                authState?.userInfo?.role === roles.landlord) ? (
                <div />
            ) : (
                <Search />
            )}
            <div className='items-center justify-center'>
                <h1 className='uppercase font-semibold text-indigo-600 text-2xl italic font-serif'>
                    RENTAL ROOM FINDER
                </h1>
                {authState?.token &&
                (authState?.userInfo?.role === roles.admin ||
                    authState?.userInfo?.role === roles.landlord) ? (
                    <span className='block text-center text-orange-400 italic text-base font-serif uppercase'>
                        {authState?.userInfo?.role}
                    </span>
                ) : (
                    <span className='block text-center text-orange-400 italic text-base font-serif'>
                        Tìm trọ theo nhu cầu của bạn
                    </span>
                )}
            </div>
            <Flex gap={15}>
                {authState?.token ? (
                    <>
                        {(authState?.userInfo?.role === roles.tenant ||
                            authState?.userInfo?.role === roles.landlord) && (
                            <Flex gap={15}>
                                <div className='flex flex-col items-end'>
                                    <span className='block'>
                                        Chào mừng quay trở lại,
                                    </span>
                                    <span className='block'>
                                        {authState.userInfo.full_name ||
                                            authState.userInfo.username}
                                    </span>
                                </div>
                            </Flex>
                        )}
                        {authState?.userInfo?.role === roles.admin && (
                            <div className='flex items-center'>
                                <span className='block uppercase font-bold'>
                                    {authState?.userInfo?.username}
                                </span>
                            </div>
                        )}
                        <Space direction='vertical'>
                            <Space wrap>
                                <StatusIndicator isOnline={authState.isOnline}>
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        placement='bottomRight'
                                        arrow
                                        trigger={['click']}
                                    >
                                        <Tooltip
                                            title='Account'
                                            placement='bottomRight'
                                            color='#f9fafb'
                                            overlayInnerStyle={{
                                                color: 'black',
                                            }}
                                        >
                                            <Avatar
                                                src={
                                                    authState?.userInfo?.avatar
                                                }
                                                icon={
                                                    !authState.userInfo
                                                        .avatar && (
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
                    </>
                ) : (
                    <Flex gap={20}>
                        <Button
                            className='bg-red-400 min-w-[100px]'
                            type='primary'
                        >
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
            </Flex>
        </div>
    )
}

export default PrimaryHeader
