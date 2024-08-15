import { MessageOutlined, PhoneOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const CardRoom = () => {
    return (
        <Link
            to='info-room'
            className='bg-white w-full shadow-lg p-4 rounded-2xl text-current hover:text-current items-center'
        >
            <img
                src='https://th.bing.com/th/id/OLC.WSrqcpLDIABGXg480x360?&rs=1&pid=ImgDetMain'
                alt='room'
                className='h-[200px] w-full object-cover'
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
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardRoom
