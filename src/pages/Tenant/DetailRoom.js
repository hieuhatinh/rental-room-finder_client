import { MessageOutlined, PhoneOutlined } from '@ant-design/icons'
import { Carousel } from 'antd'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layouts/DefaultLayout'
import Feedback from '../../components/Feedback'

const DetailRoom = () => {
    return (
        <DefaultLayout>
            <div className='p-5'>
                <div className='flex gap-5'>
                    <Carousel autoplay className='h-[450px] w-[450px]'>
                        <img
                            src='https://th.bing.com/th/id/OLC.WSrqcpLDIABGXg480x360?&rs=1&pid=ImgDetMain'
                            alt='room'
                            className='h-[450px] w-[450px] object-cover'
                        />
                        <img
                            src='https://th.bing.com/th/id/OLC.WSrqcpLDIABGXg480x360?&rs=1&pid=ImgDetMain'
                            alt='room'
                            className='h-[450px] w-[450px] object-cover'
                        />
                        <img
                            src='https://th.bing.com/th/id/OLC.WSrqcpLDIABGXg480x360?&rs=1&pid=ImgDetMain'
                            alt='room'
                            className='h-[450px] w-[450px] object-cover'
                        />
                    </Carousel>

                    <div className='mt-3 gap-3'>
                        <span className='font-semibold text-2xl'>
                            Cầu Giấy, Hà Nội
                        </span>
                        <h2>
                            <span className='font-medium'>Giá từ: </span>
                            <span className='font-medium text-red-600'>
                                1.5 triệu - 2 triệu
                            </span>
                        </h2>

                        <p>
                            <span className='font-medium'>Mô tả: </span>
                            <span>
                                Gần các trường bách-kinh-xây, rộng rãi, thoáng
                                mát, tiện nghi đầy đủ
                            </span>
                        </p>
                        <span>
                            <span className='font-medium'>các tiện nghi: </span>
                            <span>Máy giặt, điều hòa, tủ lạnh</span>
                        </span>

                        <div className='mt-4'>
                            <span className='font-semibold'>
                                Thông tin của chủ nhà
                            </span>
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
                </div>

                {/* Đánh giá của khách hàng */}
                <Feedback />
            </div>
        </DefaultLayout>
    )
}

export default DetailRoom
