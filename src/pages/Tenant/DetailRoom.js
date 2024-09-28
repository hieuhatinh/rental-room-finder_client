import { MessageOutlined, PhoneOutlined } from '@ant-design/icons'
import { Carousel, Spin, Tag } from 'antd'
import { generatePath, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import DefaultLayout from '../../layouts/DefaultLayout'
import Feedback from '../../components/Feedback'
import { paths } from '../../utils/pathsRoutes'
import { fetchGetDetailRoom } from '../../store/actions/tenant/roomsAction'
import { selectRoomsTenant } from '../../store/selector/tenantSelector'
import { convertToVnd } from '../../utils/convertValue'

const DetailRoom = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const roomsTenantState = useSelector(selectRoomsTenant)
    const [pathToChat, setPathToChat] = useState()

    useEffect(() => {
        dispatch(fetchGetDetailRoom({ id_room: id }))
    }, [dispatch, id])

    useEffect(() => {
        if (roomsTenantState?.roomDetail?.infoRoom) {
            setPathToChat(
                generatePath(
                    `${paths.shared.chatApp}/${paths.shared.chatAppIdUser}`,
                    {
                        id_user:
                            roomsTenantState?.roomDetail?.infoRoom?.id_landlord,
                    },
                ),
            )
        }
    }, [roomsTenantState?.roomDetail?.infoRoom])

    return (
        <DefaultLayout>
            {roomsTenantState.isLoading ? (
                <div className='flex items-center justify-center'>
                    <Spin size={48} />
                </div>
            ) : (
                <div className='p-5'>
                    <div className='flex gap-5'>
                        <Carousel
                            autoplay
                            arrows
                            className='h-[450px] w-[450px]'
                        >
                            {roomsTenantState?.roomDetail?.imagesRoom.map(
                                (image) => (
                                    <img
                                        key={image.id_image}
                                        src={image.image_url}
                                        alt={image.image_name}
                                        className='h-[450px] w-[450px] object-cover'
                                    />
                                ),
                            )}
                        </Carousel>

                        <div className='flex flex-col mt-3 gap-3'>
                            <span className='font-semibold text-2xl'>
                                {roomsTenantState?.roomDetail?.infoRoom?.title}
                            </span>
                            <h2>
                                <span className='font-medium'>Giá: </span>
                                <span className='font-medium text-red-600'>
                                    {convertToVnd(
                                        +roomsTenantState?.roomDetail?.infoRoom
                                            ?.price * 1000000,
                                    )}
                                </span>
                            </h2>

                            <p>
                                <span className='font-medium'>Địa chỉ: </span>
                                <span>
                                    {
                                        roomsTenantState?.roomDetail?.infoRoom
                                            ?.address_name
                                    }
                                </span>
                            </p>

                            <p>
                                <span className='font-medium'>
                                    Số người tối đa:{' '}
                                </span>
                                <span>
                                    {
                                        +roomsTenantState?.roomDetail?.infoRoom
                                            ?.capacity
                                    }
                                    người/phòng
                                </span>
                            </p>

                            <p>
                                <span className='font-medium'>Giá điện: </span>
                                <span>
                                    {convertToVnd(
                                        roomsTenantState?.roomDetail?.infoRoom
                                            ?.electricity_price * 1000,
                                    )}
                                    /kwh
                                </span>
                            </p>

                            <p>
                                <span className='font-medium'>Giá nước: </span>
                                <span>
                                    {convertToVnd(
                                        roomsTenantState?.roomDetail?.infoRoom
                                            ?.water_price * 1000,
                                    )}
                                    /người
                                </span>
                            </p>

                            <p>
                                <span className='font-medium'>
                                    diện tích phòng:{' '}
                                </span>
                                <span>
                                    {
                                        +roomsTenantState?.roomDetail?.infoRoom
                                            ?.room_area
                                    }
                                    m²
                                </span>
                            </p>

                            <div>
                                <span className='font-medium'>
                                    Các tiện nghi:{' '}
                                </span>
                                {roomsTenantState?.roomDetail?.amentitiesRoom.map(
                                    (item) => (
                                        <Tag key={item.id_amentity}>
                                            {item.amentity_name}
                                        </Tag>
                                    ),
                                )}
                            </div>

                            <p>
                                <span className='font-medium'>Mô tả: </span>
                                <span>
                                    {
                                        roomsTenantState?.roomDetail?.infoRoom
                                            ?.description
                                    }
                                </span>
                            </p>

                            <div className='mt-4'>
                                <span className='font-semibold'>
                                    Thông tin của chủ nhà
                                </span>
                                <div className='flex gap-4 mt-2'>
                                    <div className='flex gap-2'>
                                        <PhoneOutlined />
                                        <span>
                                            {
                                                roomsTenantState?.roomDetail
                                                    ?.infoRoom.phone_number
                                            }
                                        </span>
                                    </div>
                                    <Link
                                        to={pathToChat}
                                        className='flex gap-2'
                                    >
                                        <MessageOutlined />
                                        <span>Chat với chủ</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Đánh giá của khách hàng */}
                    <Feedback />
                </div>
            )}
        </DefaultLayout>
    )
}

export default DetailRoom
