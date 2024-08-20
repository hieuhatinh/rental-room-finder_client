import { Button } from 'antd'

import { paths } from '../../utils/pathsRoutes'
import NoAccessImage from '../../assets/images/no-entry.png'

const AccessDeniedpage = () => {
    return (
        <div className='h-screen w-screen flex flex-col items-center justify-center'>
            <img
                src={NoAccessImage}
                alt='no-access'
                className='h-[100px] w-[100px] mb-5'
            />
            <p>Bạn không có quyền truy cập</p>
            <Button type='link' href={paths.tenant.homeTenant} size='large'>
                Về trang chủ
            </Button>
        </div>
    )
}

export default AccessDeniedpage
