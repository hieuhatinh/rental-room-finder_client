import {
    Button,
    message,
    Modal,
    Pagination,
    Space,
    Spin,
    Tag,
    Tooltip,
} from 'antd'
import {
    DeleteOutlined,
    PlusOutlined,
    ProfileOutlined,
    WarningOutlined,
} from '@ant-design/icons'
import { useEffect } from 'react'
import {
    generatePath,
    Link,
    useNavigate,
    useSearchParams,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import LandlordLayout from '../../../layouts/LandlordLayout'
import { paths } from '../../../utils/pathsRoutes'
import {
    fetchDeleteRoom,
    fetchGetAllRoomsOfLandlord,
} from '../../../store/actions/landlord/manageRoomsAction'
import { selectLandlordRoomState } from '../../../store/selector/landlordSelector'
import { convertToVnd } from '../../../utils/convertValue'
import { LIMIT } from '../../../constants'
import { reStateMessage } from '../../../store/slice/landlord/manageRoomsSlice'

const { confirm } = Modal

function RoomManagement() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const landlordManageRoomsState = useSelector(selectLandlordRoomState)
    const [searchParams, setSearchParams] = useSearchParams()
    const [messageApi, contextHolder] = message.useMessage()

    // tạo url
    useEffect(() => {
        navigate(
            `${paths.landlord.roomManagement}?page=${
                searchParams.get('page') ?? 1
            }&limit=${searchParams.get('limit') ?? LIMIT}`,
        )
    }, [searchParams, navigate])

    // thay đổi page
    const handlePageChange = (newPage, newLimit) => {
        setSearchParams({ page: newPage, limit: newLimit || LIMIT })
    }

    useEffect(() => {
        dispatch(
            fetchGetAllRoomsOfLandlord({
                page: searchParams.get('page') ?? 1,
                limit: searchParams.get('limit') ?? LIMIT,
            }),
        )
    }, [searchParams, dispatch])

    // xử lý xóa thông tin phòng
    const showModelDelete = (id_room) => {
        confirm({
            title: 'Bạn muốn xóa bản ghi này?',
            icon: <WarningOutlined className='text-red-500' />,
            content:
                'Bản ghi này sẽ bị xóa vĩnh viễn và không thể hồi phục. các bình luận liên quan đến bài viết cũng bị xóa. Bạn có chắc chắn muốn xóa?',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Hủy bỏ',
            onOk() {
                dispatch(
                    fetchDeleteRoom({
                        id_room,
                        page: searchParams.get('page') ?? 1,
                        limit: searchParams.get('limit') ?? LIMIT,
                    }),
                )
            },
        })
    }

    // reState message notify
    useEffect(() => {
        let timoutId
        if (
            landlordManageRoomsState?.isSuccess ||
            landlordManageRoomsState?.isError
        ) {
            messageApi.open({
                type: landlordManageRoomsState?.isSuccess
                    ? 'success'
                    : landlordManageRoomsState?.isError ?? 'error',
                content: landlordManageRoomsState.message,
            })

            timoutId = setTimeout(() => {
                dispatch(reStateMessage())
            }, 1000)
        }

        return () => clearTimeout(timoutId)
    }, [
        landlordManageRoomsState.isSuccess,
        landlordManageRoomsState.isError,
        landlordManageRoomsState.message,
        messageApi,
        dispatch,
    ])

    return (
        <LandlordLayout>
            <div className='flex justify-between items-center mb-7'>
                <span className='block font-semibold text-xl'>
                    Thông tin phòng trọ của bạn
                </span>
                <Button type='primary' icon={<PlusOutlined />}>
                    <Link to={paths.landlord.addRoom}>Thêm phòng trọ</Link>
                </Button>
            </div>
            {landlordManageRoomsState.isLoading ? (
                <div className='flex items-center justify-center'>
                    <Spin />
                </div>
            ) : (
                <table className='flex-1 w-full divide-y-2'>
                    <thead>
                        <tr className='grid grid-cols-12 gap-5'>
                            <th className='font-medium col-span-1 text-center py-2'>
                                No.
                            </th>
                            <th className='font-medium col-span-3 text-center py-2'>
                                Tiêu đề
                            </th>
                            <th className='font-medium col-span-3 text-center py-2'>
                                Địa chỉ
                            </th>
                            <th className='font-medium col-span-2 text-center py-2'>
                                Giá
                            </th>
                            <th className='font-medium col-span-1 text-center py-2'>
                                Trạng thái
                            </th>
                            <th className='font-medium col-span-2 text-center py-2'>
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y-2'>
                        {landlordManageRoomsState?.rooms?.items?.map(
                            (item, index) => {
                                const pathToDetail = generatePath(
                                    `${paths.landlord.roomDetail}/${paths.landlord.idRoom}`,
                                    { id_room: item.id_room },
                                )

                                return (
                                    <tr
                                        key={item.id_room}
                                        className='grid grid-cols-12 gap-5'
                                    >
                                        <td className='text-center py-3 col-span-1'>
                                            {(landlordManageRoomsState?.rooms
                                                ?.page -
                                                1) *
                                                landlordManageRoomsState?.rooms
                                                    ?.limit +
                                                index}
                                        </td>
                                        <td className='text-left py-3 col-span-3'>
                                            {item.title}
                                        </td>
                                        <td className='text-left py-3 col-span-3'>
                                            {item.address_name}
                                        </td>
                                        <td className='text-center py-3 col-span-2'>
                                            {convertToVnd(item.price * 1000000)}
                                        </td>
                                        <td className='text-center py-3 col-span-1'>
                                            {item.status === 1 ? (
                                                <Tag color='green'>
                                                    Đã chấp nhận
                                                </Tag>
                                            ) : item.status === 0 ? (
                                                <Tag color='yellow'>
                                                    Đang chờ phản hồi
                                                </Tag>
                                            ) : (
                                                <Tag color='red'>
                                                    Yêu cầu sửa đổi
                                                </Tag>
                                            )}
                                        </td>
                                        <td className='text-center py-3 col-span-2'>
                                            <Space size='middle'>
                                                <Tooltip
                                                    placement='bottom'
                                                    title='Xem chi tiết'
                                                >
                                                    <Link to={pathToDetail}>
                                                        <ProfileOutlined className='text-xl text-orange-500 cursor-pointer' />
                                                    </Link>
                                                </Tooltip>
                                                {/* <Tooltip
                                            placement='bottom'
                                            title='Chỉnh sửa'
                                        >
                                            <FormOutlined
                                                className='text-xl text-green-400 cursor-pointer'
                                                onClick={handleClickEdit}
                                            />
                                        </Tooltip> */}
                                                <Tooltip
                                                    placement='bottom'
                                                    title='Xóa'
                                                >
                                                    <DeleteOutlined
                                                        className='text-xl text-red-600 cursor-pointer'
                                                        onClick={() =>
                                                            showModelDelete(
                                                                item.id_room,
                                                            )
                                                        }
                                                    />
                                                </Tooltip>
                                            </Space>
                                        </td>
                                    </tr>
                                )
                            },
                        )}
                    </tbody>
                </table>
            )}
            <Pagination
                defaultCurrent={searchParams.get('page')}
                total={landlordManageRoomsState?.rooms?.totalItems}
                className='flex items-center justify-center mt-10'
                onChange={handlePageChange}
            />
            {contextHolder}
        </LandlordLayout>
    )
}

export default RoomManagement
