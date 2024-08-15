import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Flex, Space } from 'antd'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
    const logout = () => {
        console.log('logout')
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
                    Landlord
                </span>
            </div>
            <Flex gap={15}>
                <div className='flex flex-col items-end'>
                    <span className='block'>Chào mừng quay trở lại,</span>
                    <span className='block'>Hieu9837</span>
                </div>

                <Space direction='vertical'>
                    <Space wrap>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement='bottomRight'
                        >
                            <Avatar
                                icon={<UserOutlined />}
                                size={48}
                                className='cursor-pointer'
                            />
                        </Dropdown>
                    </Space>
                </Space>
            </Flex>
        </div>
    )
}

export default AdminHeader
