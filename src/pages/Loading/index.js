import { Spin } from 'antd'

const LoadingPage = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <Spin size='large' />
        </div>
    )
}

export default LoadingPage
