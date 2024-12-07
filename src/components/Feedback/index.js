import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, Rate } from 'antd'

const Feedback = () => {
    const sendComment = () => {
        console.log('comment')
    }

    return (
        <div className='mt-8'>
            <div className='flex items-center justify-start'>
                <h1 className='font-bold text-xl'>Đánh giá từ người khác</h1>
                <Rate allowHalf defaultValue={2.5} disabled className='ml-4' />
            </div>
            <div className='m-8'>
                <div className='my-4 rounded-lg shadow-xl p-4'>
                    <div className='flex items-center'>
                        <div className='items-center'>
                            <Avatar size='small' icon={<UserOutlined />} />
                            <span className='ml-3'>Nguyễn Trung Hiếu</span>
                        </div>
                        <Rate
                            allowHalf
                            defaultValue={4}
                            disabled
                            className='ml-8'
                        />
                    </div>
                    <div className='mx-8 mt-3'>
                        <p>Phòng sạch sẽ, thoáng mát</p>
                    </div>
                </div>
                <div className='my-4 rounded-lg shadow-xl p-4'>
                    <div className='flex items-center'>
                        <div className='items-center'>
                            <Avatar size='small' icon={<UserOutlined />} />
                            <span className='ml-3'>Nguyễn Trung Hiếu</span>
                        </div>
                        <Rate
                            allowHalf
                            defaultValue={4}
                            disabled
                            className='ml-8'
                        />
                    </div>
                    <div className='mx-8 mt-3'>
                        <p>Phòng sạch sẽ, thoáng mát</p>
                    </div>
                </div>
            </div>
            <div className='mx-8 mt-12 p-4 flex items-center'>
                <div className='flex items-start flex-1'>
                    <Avatar
                        size='small'
                        icon={<UserOutlined />}
                        className='mr-3'
                    />
                    <Input.TextArea
                        placeholder='Viết bình luận của bạn về phòng này...'
                        onPressEnter={sendComment}
                        className='bg-zinc-100'
                    />
                </div>
                <Button
                    type='primary'
                    icon={<SendOutlined />}
                    onClick={sendComment}
                    size='large'
                    className='items-center justify-center ml-2'
                />
            </div>
        </div>
    )
}

export default Feedback
