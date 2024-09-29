import { Link } from 'react-router-dom'

import { paths } from '../../utils/pathsRoutes'
import WarningSign from '../../assets/images/warning-sign.png'

const LoginRequired = () => {
    return (
        <div className='h-screen w-screen flex flex-col items-center justify-center'>
            <img
                src={WarningSign}
                alt='no-access'
                className='h-[100px] w-[100px] mb-5'
            />
            <p>Bạn chưa đăng nhập</p>
            <div className='flex items-center gap-4 mt-4'>
                <Link
                    type='link'
                    to={paths.tenant.homeTenant}
                    size='large'
                    className='bg-lime-400 px-4 py-2 rounded-lg text-blue-500'
                >
                    Về trang chủ
                </Link>
                <Link
                    type='link'
                    to={paths.login}
                    size='large'
                    className='bg-rose-500 px-4 py-2 rounded-lg text-white'
                >
                    Đến đăng nhập
                </Link>
            </div>
        </div>
    )
}

export default LoginRequired
