import { Button, Divider } from 'antd'

import GoogleLogo from '../../assets/images/google.png'

function OAuthLogin() {
    const googleAuth = () => {
        window.open('http://localhost:5000/auth/google', '_self')
    }

    return (
        <div className='flex-col items-center justify-center'>
            <Divider className='border-gray-500'>
                <span className='block text-center text-gray-500 text-sm'>
                    Hoặc
                </span>
            </Divider>
            <Button className='w-[400px] h-[40px]' onClick={googleAuth}>
                <img src={GoogleLogo} alt='google-logo' className='h-5 w-5' />
                <span>Đăng nhập với Google</span>
            </Button>
        </div>
    )
}

export default OAuthLogin
