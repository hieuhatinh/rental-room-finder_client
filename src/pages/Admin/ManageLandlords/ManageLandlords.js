import { useEffect, useState } from 'react'
import { Button, message, Modal, Pagination, Space, Tooltip } from 'antd'
import {
    ArrowsAltOutlined,
    DeleteOutlined,
    FormOutlined,
    PlusOutlined,
    ProfileOutlined,
    WarningOutlined,
} from '@ant-design/icons'
import {
    generatePath,
    Link,
    useNavigate,
    useSearchParams,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../../layouts/AdminLayout'
import { paths } from '../../../utils/pathsRoutes'
import {
    fetchDeleteLandlord,
    fetchGetLandlords,
} from '../../../store/actions/admin/manageLandlordsAction'
import { selectManageLandlord } from '../../../store/selector/adminSelector'
import { LIMIT } from '../../../constants'
import DetailInfo from '../../../components/Admin/ManageLandlords/DetailInfo'

const { confirm } = Modal

const ManageLandlords = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const manageLandlordState = useSelector(selectManageLandlord)
    const dataLandlords = manageLandlordState?.landlords
    const [searchParams, setSearchParams] = useSearchParams()

    const [messageApi, contextHolder] = message.useMessage()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [idLandlord, setIdLandlord] = useState()

    // tạo url
    useEffect(() => {
        navigate(
            `${paths.admin.manageLandlords}?page=${
                searchParams.get('page') ?? 1
            }&limit=${searchParams.get('limit') ?? LIMIT}`,
        )
    }, [searchParams, navigate])

    // Lấy thông tin landlords
    useEffect(() => {
        dispatch(
            fetchGetLandlords({
                page: searchParams.get('page') ?? 1,
                limit: searchParams.get('limit') ?? LIMIT,
            }),
        )
    }, [searchParams, dispatch])

    const handlePageChange = (newPage, newLimit) => {
        setSearchParams({ page: newPage, limit: newLimit || LIMIT })
    }

    // Edit thông tin landlord
    const handleClickEdit = (id_landlord) => {
        const pathLandlord = generatePath(
            `${paths.admin.editProfileLandlord + paths.admin.idLandlord}`,
            {
                id_landlord,
            },
        )

        window.open(pathLandlord)
    }

    // xử lý xóa thông tin landlord
    const showModelDelete = (idLandlord) => {
        confirm({
            title: 'Xóa thông tin chủ phòng này?',
            icon: <WarningOutlined className='text-red-500' />,
            content:
                'Bản ghi này sẽ bị xóa vĩnh viễn và không thể hồi phục. Chắc chắn muốn xóa?',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk() {
                // dispatch(fetchDeleteLandlord({ idLandlord }))
            },
        })
    }

    // hiển thị thông tin landlord
    const showModal = (idLandlord) => {
        setIdLandlord(idLandlord)
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    // hiển thị thông báo
    useEffect(() => {
        if (manageLandlordState.isSuccess) {
            messageApi.open({
                type: 'success',
                content: manageLandlordState.message,
            })
        }
    }, [manageLandlordState, messageApi])

    return (
        <AdminLayout>
            <div className='flex justify-between items-center mb-7'>
                <span className='block font-semibold text-xl'>
                    Thông tin các đối tác
                </span>
                <Button type='primary' icon={<PlusOutlined />}>
                    <Link
                        to={paths.admin.addLandlord}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Thêm đối tác
                    </Link>
                </Button>
            </div>
            <table className='w-full divide-y-2'>
                <thead>
                    <tr className='grid grid-cols-12'>
                        <th className='font-medium col-span-1 text-center py-2'>
                            No.
                        </th>
                        <th className='font-medium col-span-2 text-center py-2'>
                            Họ tên
                        </th>
                        <th className='font-medium col-span-1 text-center py-2'>
                            Giới tính
                        </th>
                        <th className='font-medium col-span-1 text-center py-2'>
                            Tuổi
                        </th>
                        <th className='font-medium col-span-3 text-center py-2'>
                            Địa chỉ
                        </th>
                        <th className='font-medium col-span-2 text-center py-2'>
                            Thông tin liên hệ
                        </th>
                        <th className='font-medium col-span-2 text-center py-2'>
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataLandlords?.items?.map((item, index) => (
                        <tr
                            key={item.id_landlord}
                            className='grid grid-cols-12'
                        >
                            <td className='col-span-1 text-center py-3'>
                                {index + 1}
                            </td>
                            <td className='col-span-2 text-center py-3'>
                                {item?.full_name}
                            </td>
                            <td className='col-span-1 text-center py-3'>
                                {item.gender === 'male'
                                    ? 'Nam'
                                    : item.gender === 'female'
                                    ? 'Nữ'
                                    : 'Khác'}
                            </td>
                            <td className='col-span-1 text-center py-3'>
                                {item?.age}
                            </td>
                            <td className='col-span-3 text-left py-3'>
                                {item?.address_name}
                            </td>
                            <td className='col-span-2 text-center py-3'>
                                {item?.phone_number}
                            </td>
                            <td className='col-span-2 text-center py-3'>
                                <Space size='middle'>
                                    <Tooltip
                                        placement='bottom'
                                        title='Chỉnh sửa'
                                    >
                                        <FormOutlined
                                            className='text-xl text-green-400 cursor-pointer mr-2'
                                            onClick={() =>
                                                handleClickEdit(
                                                    item?.id_landlord,
                                                )
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip placement='bottom' title='Xóa'>
                                        <DeleteOutlined
                                            className='text-xl text-red-600 cursor-pointer'
                                            onClick={() =>
                                                showModelDelete(
                                                    item?.id_landlord,
                                                )
                                            }
                                        />
                                    </Tooltip>
                                    <Tooltip
                                        placement='bottom'
                                        title='Xem chi tiết'
                                    >
                                        <ProfileOutlined
                                            className='text-xl text-orange-500 cursor-pointer'
                                            onClick={() =>
                                                showModal(item?.id_landlord)
                                            }
                                        />
                                    </Tooltip>
                                </Space>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                defaultCurrent={searchParams.get('page')}
                total={dataLandlords.totalItems}
                className='flex items-center justify-center mt-10'
                onChange={handlePageChange}
            />

            <Modal
                title='Thông tin chi tiết'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={750}
                footer={[
                    <Button key='cancel' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key='edit'
                        type='primary'
                        onClick={handleClickEdit}
                        icon={<ArrowsAltOutlined className='text-lg' />}
                    >
                        Chỉnh sửa thông tin
                    </Button>,
                ]}
            >
                <DetailInfo idLandlord={idLandlord} />
            </Modal>

            {contextHolder}
        </AdminLayout>
    )
}

export default ManageLandlords
