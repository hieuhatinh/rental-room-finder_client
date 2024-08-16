import { Button, Modal, Space, Tooltip } from 'antd'

import LandlordLayout from '../../layouts/LandlordLayout'
import {
    DeleteOutlined,
    FormOutlined,
    PlusOutlined,
    WarningOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { paths } from '../../utils/pathsRoutes'

const { confirm } = Modal

const data = [
    {
        id: 1,
        title: 'Phòng trọ giá rẻ',
        address: 'số 2, ngõ 137, phường Hoàn kiếm, Quận Hoàn Kiếm, Hà Nội',
        price: '1.500.000 VND',
    },
    {
        id: 2,
        title: 'Phòng trọ giá rẻ',
        address: 'phường Hoàn kiếm, Quận Hoàn Kiếm, Hà Nội',
        price: '1.500.000 VND',
    },
    {
        id: 3,
        title: 'Phòng trọ giá rẻ',
        address: 'số 2, ngõ 137, phường Hoàn kiếm, Quận Hoàn Kiếm, Hà Nội',
        price: '1.500.000 VND',
    },
    {
        id: 4,
        title: 'Phòng trọ giá rẻ',
        address: 'số 2, ngõ 137, phường Hoàn kiếm, Quận Hoàn Kiếm, Hà Nội',
        price: '1.500.000 VND',
    },
]

function RoomManagement() {
    const navigate = useNavigate()

    const handleClickEdit = () => {
        navigate(paths.landlord.editRoom)
    }

    // xử lý xóa thông tin phòng
    const showModelDelete = () => {
        confirm({
            title: 'Bạn muốn xóa bản ghi này?',
            icon: <WarningOutlined className='text-red-500' />,
            content:
                'Bản ghi này sẽ bị xóa vĩnh viễn và không thể hồi phục. Bạn có chắc chắn muốn xóa?',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk() {
                console.log('OK')
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    return (
        <LandlordLayout>
            <div className='flex justify-between items-center mb-7'>
                <span className='block font-semibold text-xl'>
                    Thông tin phòng trọ của bạn
                </span>
                <Button type='primary' icon={<PlusOutlined />}>
                    <Link className={paths.landlord.addRoom}>
                        Thêm phòng trọ
                    </Link>
                </Button>
            </div>
            <table className='flex-1 w-full divide-y-2'>
                <thead>
                    <tr>
                        <th className='font-medium flex-1 text-left py-2'>
                            No.
                        </th>
                        <th className='font-medium flex-1 text-left py-2'>
                            Tiêu đề
                        </th>
                        <th className='font-medium flex-1 text-left py-2'>
                            Địa chỉ
                        </th>
                        <th className='font-medium flex-1 text-left py-2'>
                            Giá
                        </th>
                        <th className='font-medium flex-1 text-left py-2'>
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td className='text-left py-3'>{index + 1}</td>
                            <td className='text-left py-3'>{item.title}</td>
                            <td className='text-left py-3'>{item.address}</td>
                            <td className='text-left py-3'>{item.price}</td>
                            <td className='text-left py-3'>
                                <Space size='middle'>
                                    <Tooltip
                                        placement='bottom'
                                        title='Chỉnh sửa'
                                    >
                                        <FormOutlined
                                            className='text-xl text-green-400 cursor-pointer mr-2'
                                            onClick={handleClickEdit}
                                        />
                                    </Tooltip>
                                    <Tooltip placement='bottom' title='Xóa'>
                                        <DeleteOutlined
                                            className='text-xl text-red-600 cursor-pointer'
                                            onClick={showModelDelete}
                                        />
                                    </Tooltip>
                                </Space>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LandlordLayout>
    )
}

export default RoomManagement
