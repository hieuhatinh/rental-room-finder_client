import { Carousel, message, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import LandlordLayout from '../../../layouts/LandlordLayout'
import Feedback from '../../../components/Feedback'
import { fetchGetDetailRoomByLandlord } from '../../../store/actions/landlord/manageRoomsAction'
import { selectLandlordRoomState } from '../../../store/selector/landlordSelector'
import { convertToVnd } from '../../../utils/convertValue'
import { colorsOfTag } from '../../../constants'
import { reStateMessage } from '../../../store/slice/landlord/manageRoomsSlice'

const DetailRoomLandlord = () => {
    const dispatch = useDispatch()
    const { id_room } = useParams()
    const landlordManageRoomsState = useSelector(selectLandlordRoomState)
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        dispatch(fetchGetDetailRoomByLandlord({ id_room }))
    }, [])

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
            <div className='p-5'>
                <div className='flex gap-5'>
                    <Carousel arrows autoplay className='h-[450px] w-[450px]'>
                        {landlordManageRoomsState?.roomInfo?.imagesOfRoom?.map(
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
                        <Tag
                            color={
                                landlordManageRoomsState?.roomInfo?.is_accept
                                    ? 'green'
                                    : 'yellow'
                            }
                            className='w-fit'
                        >
                            {landlordManageRoomsState?.roomInfo?.is_accept
                                ? 'Đã được chấp nhận'
                                : 'Đang chờ duyệt'}
                        </Tag>
                        <span className='font-semibold text-xl'>
                            {landlordManageRoomsState?.roomInfo?.title}
                        </span>
                        <h2>
                            <span className='font-medium'>Giá: </span>
                            <span className='font-medium text-red-600'>
                                {convertToVnd(
                                    landlordManageRoomsState?.roomInfo?.price *
                                        1000000,
                                )}
                                /Tháng
                            </span>
                        </h2>

                        <p>
                            <span className='font-medium'>Địa chỉ: </span>
                            <span>
                                {
                                    landlordManageRoomsState?.roomInfo
                                        ?.address_name
                                }
                            </span>
                        </p>

                        <p>
                            <span className='font-medium'>Giá điện: </span>
                            <span>
                                {convertToVnd(
                                    landlordManageRoomsState?.roomInfo
                                        ?.electricity_price * 1000,
                                )}
                                /kwh
                            </span>
                        </p>

                        <p>
                            <span className='font-medium'>Giá nước: </span>
                            <span>
                                {convertToVnd(
                                    landlordManageRoomsState?.roomInfo
                                        ?.water_price * 1000,
                                )}
                                /người
                            </span>
                        </p>

                        <p>
                            <span className='font-medium'>
                                Diện tích phòng:{' '}
                            </span>
                            <span>
                                {
                                    +landlordManageRoomsState?.roomInfo
                                        ?.water_price
                                }
                                m²
                            </span>
                        </p>

                        <p>
                            <span className='font-medium'>Mô tả: </span>
                            <span>
                                {landlordManageRoomsState?.roomInfo?.describe}
                            </span>
                        </p>
                        <span>
                            <span className='font-medium'>các tiện nghi: </span>
                            {landlordManageRoomsState?.roomInfo?.list_amentity.map(
                                (item) => {
                                    let colorTag = Math.floor(
                                        Math.random() * colorsOfTag.length,
                                    )
                                    return (
                                        <Tag
                                            key={item.id_amentity}
                                            color={colorsOfTag[colorTag]}
                                        >
                                            {item.amentity_name}
                                        </Tag>
                                    )
                                },
                            )}
                        </span>
                    </div>
                </div>

                {/* Đánh giá của khách hàng */}
                <Feedback />
            </div>
            {contextHolder}
        </LandlordLayout>
    )
}

export default DetailRoomLandlord
