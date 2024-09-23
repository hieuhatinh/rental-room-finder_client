import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import AdminLayout from '../../../layouts/AdminLayout'
import { fetchGetUnacceptRooms } from '../../../store/actions/admin/manageRoomsAction'
import { adminSelectRoomsManage } from '../../../store/selector/adminSelector'
import {
    generatePath,
    Link,
    useNavigate,
    useSearchParams,
} from 'react-router-dom'
import { Avatar, Pagination, Spin, Tooltip } from 'antd'
import { paths } from '../../../utils/pathsRoutes'
import { LIMIT } from '../../../constants'
import { LoadingOutlined } from '@ant-design/icons'

const RoomApprovalsRequest = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const adminRoomsState = useSelector(adminSelectRoomsManage)

    const [searchParams, setSearchParams] = useSearchParams()

    // tạo url
    useEffect(() => {
        navigate(
            `${paths.admin.roomApprovalsRequest}?page=${
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
            fetchGetUnacceptRooms({
                page: searchParams.get('page') ?? 1,
                limit: searchParams.get('limit') ?? LIMIT,
            }),
        )
    }, [searchParams, dispatch])

    return (
        <AdminLayout>
            <h1 className='font-semibold text-xl'>
                Yêu cầu phê duyệt tạo phòng mới
            </h1>

            {adminRoomsState.isLoading ? (
                <Spin
                    indicator={<LoadingOutlined spin />}
                    className='text-xl'
                />
            ) : (
                <>
                    <div className='flex items-center justify-center mt-3'>
                        <div className='grid grid-cols-1 w-[700px]'>
                            {adminRoomsState?.unacceptedRooms?.unacceptRooms?.map(
                                (item) => {
                                    const pathToDetail = generatePath(
                                        `${
                                            paths.admin.detailApprovalRequest +
                                            paths.admin.idLandlord +
                                            paths.admin.idRoom
                                        }`,
                                        {
                                            id_landlord: item?.id_landlord,
                                            id_room: item?.id_room,
                                        },
                                    )

                                    return (
                                        <Tooltip
                                            key={item?.id_room}
                                            title='Bấm vào để xem chi tiết'
                                        >
                                            <div className='p-3 my-1 hover:bg-black hover:bg-opacity-20 rounded-lg cursor-pointer'>
                                                <Link
                                                    to={pathToDetail}
                                                    className='w-full flex items-center gap-3 h-[100px] hover:text-slate-900'
                                                >
                                                    <Avatar
                                                        shape='square'
                                                        src={item?.profile_img}
                                                        className='w-1/5 h-[100px]'
                                                    />
                                                    <div className='w-4/5'>
                                                        <p className='font-semibold text-lg overflow-hidden text-ellipsis whitespace-nowrap text-nowrap'>
                                                            Có 1 yêu cầu tạo
                                                            phòng mới từ
                                                            landlord{' '}
                                                            {item?.full_name}
                                                        </p>
                                                        <p className='text-ellipsis overflow-hidden whitespace-nowrap text-nowrap'>
                                                            <span className='font-medium italic'>
                                                                Tiêu đề:
                                                            </span>{' '}
                                                            {item?.title}
                                                        </p>
                                                        <p className='text-ellipsis overflow-hidden whitespace-nowrap text-nowrap'>
                                                            <span className='font-medium italic'>
                                                                Địa chỉ:
                                                            </span>{' '}
                                                            {item?.address_room}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Tooltip>
                                    )
                                },
                            )}
                        </div>
                    </div>

                    <Pagination
                        defaultCurrent={searchParams.get('page')}
                        total={adminRoomsState?.unacceptedRooms?.totalItems}
                        className='flex items-center justify-center mt-10'
                        onChange={handlePageChange}
                    />
                </>
            )}
        </AdminLayout>
    )
}

export default RoomApprovalsRequest
