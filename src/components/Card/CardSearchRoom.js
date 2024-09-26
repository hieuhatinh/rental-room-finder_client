import { MessageOutlined, PhoneOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Rate, Tag, Tooltip } from 'antd'
import { generatePath, Link, useNavigate } from 'react-router-dom'

import { convertToKilometers, convertToVnd } from '../../utils/convertValue'
import { paths } from '../../utils/pathsRoutes'

const CardSearchRoom = ({ room }) => {
    const navigate = useNavigate()
    const [pathToChat] = useState(
        generatePath(`${paths.shared.chatApp}/${paths.shared.chatAppIdUser}`, {
            id_user: room?.id_landlord,
        }),
    )
    const [pathToDetailRoom] = useState(
        generatePath(`${paths.tenant.roomDetail}`, {
            id: room?.id_room,
        }),
    )

    const handleClickChat = (e) => {
        e.stopPropagation()
        e.preventDefault()

        navigate(pathToChat)
    }

    return (
        <Tooltip title='Bấm vào để xem chi tiết'>
            <Link
                to={pathToDetailRoom}
                className='relative border my-2 flex gap-5 rounded-md shadow-lg p-3 text-current hover:text-current'
            >
                <img
                    src={room?.image_url}
                    alt={room?.image_url}
                    className='h-[200px] w-[200px] object-cover'
                />

                <div className='mt-3'>
                    <p className='font-medium mb-3 line-clamp-2'>
                        {room?.title}
                    </p>
                    <h2>
                        <span className='font-medium'>Giá: </span>
                        <span className='font-medium text-red-600'>
                            {convertToVnd(room?.price * 1000000)}
                        </span>
                    </h2>
                    <span>
                        <span className='font-medium'>Địa chỉ: </span>
                        <span>{room?.address_name}</span>
                    </span>

                    <p>
                        <span className='font-medium'>Mô tả: </span>
                        <span>{room?.description}</span>
                    </p>
                    <span>
                        <span className='font-medium'>Các tiện nghi: </span>
                        {room?.list_amentity.map((item) => (
                            <Tag key={item.id_amentity}>
                                {item.amentity_name}
                            </Tag>
                        ))}
                    </span>

                    <div className='mt-4'>
                        <span className='font-semibold'>
                            Thông tin của chủ nhà
                        </span>
                        <div className='flex gap-4 mt-2'>
                            <div className='flex gap-2'>
                                <PhoneOutlined />
                                <span>{room?.phone_number}</span>
                            </div>
                            <div
                                onMouseEnter={(e) =>
                                    (e.currentTarget.title = pathToChat)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.title = '')
                                }
                                onClick={handleClickChat}
                                className='flex gap-1 text-sky-500'
                            >
                                <MessageOutlined />
                                <span>Chat với chủ</span>
                            </div>
                            <Rate allowHalf defaultValue={2.5} disabled />
                        </div>
                    </div>
                </div>

                <Tag
                    className='absolute right-0 top-3 h-fit text-sm'
                    color='green'
                >
                    Cách địa điểm tìm kiếm {convertToKilometers(room?.distance)}{' '}
                    km
                </Tag>
            </Link>
        </Tooltip>
    )
}

export default CardSearchRoom
