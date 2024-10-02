import { useState } from 'react'
import { MessageOutlined, PhoneOutlined } from '@ant-design/icons'
import { generatePath, Link, useNavigate } from 'react-router-dom'

import { paths } from '../../utils/pathsRoutes'
import { convertToVnd } from '../../utils/convertValue'

const CardRoom = ({ room }) => {
    const navigate = useNavigate()
    const [pathToChat] = useState(
        generatePath(`${paths.shared.chatApp}/${paths.shared.chatAppIdUser}`, {
            id_user: room?.id_landlord,
        }),
    )

    const handleClickChat = (e) => {
        e.stopPropagation()
        e.preventDefault()

        navigate(pathToChat)
    }

    return (
        <Link
            to={generatePath(paths.tenant.roomDetail, { id: room?.id_room })}
            className='bg-white w-full shadow-lg p-4 rounded-2xl text-current hover:text-current items-center'
        >
            {room?.image_type === 'video' ? (
                <video className='h-[200px] w-full object-cover'>
                    <source src={room?.image_url} type='video/mp4' />
                </video>
            ) : room?.image_type === 'image' ? (
                <img
                    src={room?.image_url}
                    alt={room?.image_url}
                    className='h-[200px] w-full object-cover'
                />
            ) : (
                <></>
            )}

            <div className='mt-3'>
                <p className='font-medium mb-3 line-clamp-2'>{room?.title}</p>

                <h2>
                    <span className='font-medium'>Giá: </span>
                    <span className='font-medium text-red-600'>
                        {convertToVnd(room?.price * 1000000)}
                    </span>
                </h2>
                <p className='line-clamp-4'>
                    <span className='font-medium'>Địa chỉ: </span>
                    <span>{room?.address_name}</span>
                </p>

                <div className='mt-4'>
                    <span className='font-semibold'>Thông tin của chủ nhà</span>
                    <div className='flex items-center gap-5 mt-2'>
                        <div className='flex gap-1'>
                            <PhoneOutlined />
                            <span>{room?.phone_number}</span>
                        </div>
                        <div
                            onMouseEnter={(e) =>
                                (e.currentTarget.title = pathToChat)
                            }
                            onMouseLeave={(e) => (e.currentTarget.title = '')}
                            onClick={handleClickChat}
                            className='flex gap-1 text-sky-500'
                        >
                            <MessageOutlined />
                            <span>Chat với chủ</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardRoom
