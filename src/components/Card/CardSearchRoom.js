import { MessageOutlined, PhoneOutlined } from '@ant-design/icons'
import { Rate } from 'antd'
import { Link } from 'react-router-dom'

const CardSearchRoom = () => {
    return (
        <Link className='flex gap-5 rounded-md shadow-lg p-3 text-current hover:text-current'>
            <img
                src='https://th.bing.com/th/id/OLC.WSrqcpLDIABGXg480x360?&rs=1&pid=ImgDetMain'
                alt='room'
                className='h-[200px] w-[200px] object-cover'
            />

            <div className='mt-3'>
                <h2>
                    <span className='font-medium'>Giá từ: </span>
                    <span className='font-medium text-red-600'>
                        1.5 triệu - 2 triệu
                    </span>
                </h2>
                <span>
                    <span className='font-medium'>Địa chỉ: </span>
                    <span>Cầu Giấy, Hà Nội</span>
                </span>

                <p>
                    <span className='font-medium'>Mô tả: </span>
                    <span>
                        Gần các trường bách-kinh-xây, rộng rãi, thoáng mát, tiện
                        nghi đầy đủ
                    </span>
                </p>
                <span>
                    <span className='font-medium'>các tiện nghi: </span>
                    <span>Máy giặt, điều hòa, tủ lạnh</span>
                </span>

                <div className='mt-4'>
                    <span className='font-semibold'>Thông tin của chủ nhà</span>
                    <div className='flex gap-4 mt-2'>
                        <div className='flex gap-2'>
                            <PhoneOutlined />
                            <span>0987654321</span>
                        </div>
                        <Link to='/chat' className='flex gap-2'>
                            <MessageOutlined />
                            <span>Chat với chủ</span>
                        </Link>
                        <Rate allowHalf defaultValue={2.5} disabled />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardSearchRoom
