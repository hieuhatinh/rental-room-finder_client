import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Avatar, Button, Carousel, message, Result, Spin, Tag } from 'antd'

import AdminLayout from '../../../layouts/AdminLayout'
import {
    fetchAcceptRequest,
    fetchGetDetailUnacceptRoom,
} from '../../../store/actions/admin/manageRoomsAction'
import { adminSelectRoomsManage } from '../../../store/selector/adminSelector'
import { formattedDate, convertToVnd } from '../../../utils/convertValue'
import { paths } from '../../../utils/pathsRoutes'
import { reState } from '../../../store/slice/admin/manageRoomsSlice'
import { SocketContext } from '../../../services/SocketProvider'

const DetailApprovalResquest = () => {
    const dispatch = useDispatch()
    const adminRoomsState = useSelector(adminSelectRoomsManage)
    const { id_landlord, id_room } = useParams()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()

    const [landlordInfo, setLandlordInfo] = useState()
    const [roomInfo, setRoomInfo] = useState()

    const socketConnection = useContext(SocketContext)

    useEffect(() => {
        if (adminRoomsState?.detailUnacceptRooms) {
            setLandlordInfo(adminRoomsState?.detailUnacceptRooms?.landlordInfo)
            setRoomInfo(adminRoomsState?.detailUnacceptRooms?.roomInfo)
        }
    }, [adminRoomsState?.detailUnacceptRooms])

    useEffect(() => {
        dispatch(fetchGetDetailUnacceptRoom({ id_landlord, id_room }))
    }, [])

    // chấp nhận yêu cầu
    const handleAcceptRequest = () => {
        dispatch(fetchAcceptRequest({ id_landlord, id_room }))
            .then((result) => {
                messageApi.open({
                    type: 'success',
                    content: adminRoomsState.message,
                })

                socketConnection.emit('accept-request')

                setTimeout(() => {
                    dispatch(reState())
                    navigate(paths.admin.roomApprovalsRequest)
                }, 1000)
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: adminRoomsState.message,
                })
                setTimeout(() => {
                    dispatch(reState())
                }, 1000)
            })
    }

    return (
        <AdminLayout>
            {adminRoomsState?.isLoading ? (
                <div className='flex items-center justify-center'>
                    <Spin />
                </div>
            ) : !!landlordInfo && !!roomInfo ? (
                <>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl font-semibold'>
                            Yêu cầu phê duyệt từ {landlordInfo?.full_name}
                        </h1>
                        <span className='text-base font-normal text-zinc-600 italic'>
                            Ngày gửi yêu cầu:{' '}
                            {formattedDate(roomInfo?.created_at)}
                        </span>
                    </div>

                    <div className='my-5 mx-10 flex items-center justify-center'>
                        <div className='w-[900px] flex flex-col items-center justify-center'>
                            {/* Thông tin chủ phòng */}
                            <div className='w-full'>
                                <h3 className='text-center font-normal text-lg italic'>
                                    Thông tin chủ phòng
                                </h3>
                                <div className='flex items-center mx-10 gap-4 mt-2'>
                                    <Avatar
                                        size={150}
                                        src={landlordInfo?.profile_img}
                                    />
                                    <div>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Họ tên:
                                            </span>
                                            {landlordInfo?.full_name}
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Tuổi:
                                            </span>
                                            {landlordInfo?.age}
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Số điện thoại:
                                            </span>
                                            {landlordInfo?.phone_number}
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Địa chỉ:
                                            </span>
                                            {landlordInfo?.address_landlord}
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Giới tính:
                                            </span>
                                            {landlordInfo?.gender}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='border-2 w-full my-5' />

                            {/* Thông tin phòng đăng ký */}
                            <div className='w-full'>
                                <h3 className='text-center font-normal text-lg italic'>
                                    Thông tin phòng yêu cầu phê duyệt
                                </h3>
                                <div className='flex items-start mx-10 gap-4 mt-5'>
                                    <Carousel
                                        infinite={false}
                                        arrows
                                        className='w-[300px] flex justify-center items-center object-contain'
                                        arrowSize={24}
                                        fontSize={30}
                                        // adaptiveHeight
                                    >
                                        {roomInfo?.images?.map((item) => {
                                            return item.image_type ===
                                                'image' ? (
                                                <img
                                                    key={item.id_image}
                                                    src={item.image_url}
                                                    alt={item.image_name}
                                                    className='h-[400px] w-full'
                                                />
                                            ) : item.image_type === 'video' ? (
                                                <video
                                                    key={item.id_image}
                                                    className='h-[400px] w-full object-cover'
                                                    controls
                                                >
                                                    <source
                                                        src={item.image_url}
                                                        type='video/mp4'
                                                    />
                                                </video>
                                            ) : (
                                                <></>
                                            )
                                        })}
                                    </Carousel>
                                    <div className='flex flex-col gap-3'>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Title:
                                            </span>
                                            {roomInfo?.title}
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Địa chỉ phòng trọ:
                                            </span>
                                            {roomInfo?.address_room}
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Giá phòng:
                                            </span>
                                            {convertToVnd(
                                                roomInfo?.price * 1000000,
                                            )}
                                            /Tháng
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Giá điện:
                                            </span>
                                            {convertToVnd(
                                                roomInfo?.electricity_price *
                                                    1000,
                                            )}
                                            /kwh
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Giá nước:
                                            </span>
                                            {convertToVnd(
                                                roomInfo?.water_price * 1000,
                                            )}
                                            /người
                                        </p>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Diện tích phòng (m²):
                                            </span>
                                            {+roomInfo?.room_area}
                                        </p>
                                        <div>
                                            <span className='mr-2 font-medium italic'>
                                                Các tiện ích phòng:
                                            </span>
                                            {roomInfo?.amentities?.map(
                                                (item) => (
                                                    <Tag key={item}>{item}</Tag>
                                                ),
                                            )}
                                        </div>
                                        <p>
                                            <span className='mr-2 font-medium italic'>
                                                Mô tả:
                                            </span>
                                            {roomInfo?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center pt-4 gap-4'>
                        <Button
                            type='primary'
                            onClick={handleAcceptRequest}
                            loading={adminRoomsState?.isLoading}
                        >
                            Chấp nhận yêu cầu
                        </Button>
                        {/* <Button type='primary' className='bg-yellow-500'>
                    Gửi yêu cầu sửa đổi
                </Button> */}
                    </div>
                </>
            ) : adminRoomsState?.isError ? (
                // Hiển thị lỗi
                <Result
                    status='error'
                    title='Có lỗi xảy ra'
                    subTitle={adminRoomsState?.message}
                    extra={[
                        <Button
                            type='link'
                            href={paths.admin.roomApprovalsRequest}
                            className='bg-blue-500 text-white'
                        >
                            Về trang
                            <span className='italic'>Yêu cầu phê duyệt</span>
                        </Button>,
                    ]}
                />
            ) : (
                // Thông báo nếu bài đã được chấp nhận
                <Result
                    status='success'
                    title='Bài này đã được chấp nhận'
                    extra={[
                        <Button
                            type='link'
                            href={paths.admin.roomApprovalsRequest}
                            className='bg-blue-500 text-white'
                        >
                            Về trang
                            <span className='italic'>Yêu cầu phê duyệt</span>
                        </Button>,
                    ]}
                />
            )}

            {contextHolder}
        </AdminLayout>
    )
}

export default DetailApprovalResquest
