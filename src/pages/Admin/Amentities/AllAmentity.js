import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { Button, Popconfirm, Spin, Tag } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import AdminLayout from '../../../layouts/AdminLayout'
import { selectAmentities } from '../../../store/selector/amentitiesSelector'
import {
    fetchAcceptAmentity,
    fetchAllAmentitiesByAdmin,
    fetchRefuseAmentity,
} from '../../../store/actions/amentitiesAction'
import { SocketContext } from '../../../services/SocketProvider'

const AllAmentities = () => {
    const dispatch = useDispatch()
    const amentitiesState = useSelector(selectAmentities)
    const socketConnection = useContext(SocketContext)

    useEffect(() => {
        dispatch(fetchAllAmentitiesByAdmin())
    }, [dispatch])

    const handleAcceptAmentity = (amentity) => {
        dispatch(
            fetchAcceptAmentity({ id_amentity: amentity.id_amentity }),
        ).then((result) => {
            if (result.type.includes('fulfilled')) {
                socketConnection.emit('accept-amentity', {
                    amentity,
                })
            }
        })
    }

    const handleRefuseAmentity = (amentity) => {
        dispatch(
            fetchRefuseAmentity({ id_amentity: amentity.id_amentity }),
        ).then((result) => {
            if (result.type.includes('fulfilled')) {
                socketConnection.emit('refuse-amentity', {
                    amentity,
                })
            }
        })
    }

    return (
        <AdminLayout>
            <div className='flex justify-between items-center mb-7'>
                <span className='block font-semibold text-xl'>
                    Tất cả các tiện ích phòng
                </span>
            </div>
            {amentitiesState?.isLoading ? (
                <div className='flex items-center justify-center'>
                    <Spin />
                </div>
            ) : (
                <table className='w-full divide-y-2'>
                    <thead>
                        <tr className='grid grid-cols-5'>
                            <th className='font-medium col-span-1 text-center py-2'>
                                No.
                            </th>
                            <th className='font-medium col-span-1 text-center py-2'>
                                Tên tiện ích
                            </th>
                            <th className='font-medium col-span-1 text-center py-2'>
                                Người tạo
                            </th>
                            <th className='font-medium col-span-1 text-center py-2'>
                                Trạng thái
                            </th>
                            <th className='font-medium col-span-1 text-center py-2'>
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {amentitiesState?.amentities?.map((item, index) => (
                            <tr
                                key={item.id_amentity}
                                className='grid grid-cols-5'
                            >
                                <td className='col-span-1 text-center py-3'>
                                    {index + 1}
                                </td>
                                <td className='col-span-1 text-center py-3'>
                                    {item.amentity_name}
                                </td>
                                <td className='col-span-1 text-center py-3'>
                                    <Tag>{item.full_name || 'null'}</Tag>
                                </td>
                                <td className='col-span-1 text-center py-3'>
                                    <Tag
                                        color={`${
                                            item.status === 'pending'
                                                ? 'yellow'
                                                : item.status === 'approved'
                                                ? 'green'
                                                : 'red'
                                        }`}
                                    >
                                        {item.status}
                                    </Tag>
                                </td>
                                <td className='col-span-1 text-center flex items-center justify-center gap-4'>
                                    {item?.status === 'pending' &&
                                    item?.create_by ? (
                                        <>
                                            <Popconfirm
                                                title='Chấp nhận tiện ích'
                                                description='Chắc chắn về việc chấp nhận tiện ích này?'
                                                okText='Yes'
                                                cancelText='No'
                                                icon={
                                                    <QuestionCircleOutlined className='text-yellow-500' />
                                                }
                                                onConfirm={() =>
                                                    handleAcceptAmentity(item)
                                                }
                                            >
                                                <Button
                                                    variant='filled'
                                                    color='primary'
                                                >
                                                    Chấp nhận
                                                </Button>
                                            </Popconfirm>

                                            <Popconfirm
                                                title='Từ chối tiện ích'
                                                description='Chắc chắn về việc từ chối tiện ích này?'
                                                okText='Yes'
                                                cancelText='No'
                                                icon={
                                                    <QuestionCircleOutlined
                                                        style={{
                                                            color: 'red',
                                                        }}
                                                    />
                                                }
                                                onConfirm={() =>
                                                    handleRefuseAmentity(item)
                                                }
                                            >
                                                <Button
                                                    variant='filled'
                                                    color='danger'
                                                >
                                                    Từ chối
                                                </Button>
                                            </Popconfirm>
                                        </>
                                    ) : (
                                        <Button variant='filled' color='danger'>
                                            Xóa
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    )
}

export default AllAmentities
