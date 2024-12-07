import { Link } from 'react-router-dom'

import AdminLayout from '../../layouts/AdminLayout'
import { paths } from '../../utils/pathsRoutes'

import Notification from '../../assets/images/notification.png'
import RequestApproval from '../../assets/images/request-approval.png'
import ManageLandlords from '../../assets/images/manage-landlords.png'
import Statistical from '../../assets/images/statistical.png'
import AmentitiesManagement from '../../assets/images/utilization.png'

const HomeAdmin = () => {
    return (
        <AdminLayout>
            <div className='grid grid-cols-12 gap-10'>
                <Link
                    to={paths.admin.homeAdmin}
                    className='flex flex-col items-center justify-center gap-5 rounded-lg shadow-xl h-[200px] col-start-2 col-span-3'
                >
                    <img
                        src={Notification}
                        alt='notification'
                        className='h-[100px] w-[100px]'
                    />
                    <span className='font-medium text-base'>Thông báo</span>
                </Link>

                <Link
                    to={paths.admin.roomApprovalsRequest}
                    className='flex flex-col items-center justify-center gap-5 rounded-lg shadow-xl h-[200px] col-span-3'
                >
                    <img
                        src={RequestApproval}
                        alt='request approval'
                        className='h-[100px] w-[100px]'
                    />
                    <span className='font-medium text-base'>
                        Yêu cầu phê duyệt
                    </span>
                </Link>

                <Link
                    to={paths.admin.allAmentities}
                    className='flex flex-col items-center justify-center gap-5 rounded-lg shadow-xl h-[200px] col-span-3'
                >
                    <img
                        src={AmentitiesManagement}
                        alt='amentities management'
                        className='h-[100px] w-[100px]'
                    />
                    <span className='font-medium text-base'>
                        Quản lý tiện ích
                    </span>
                </Link>

                <Link
                    to={paths.admin.manageLandlords}
                    className='flex flex-col items-center justify-center gap-5 rounded-lg shadow-xl h-[200px] col-start-3 col-span-3'
                >
                    <img
                        src={ManageLandlords}
                        alt='manage landlords'
                        className='h-[100px] w-[100px]'
                    />
                    <span className='font-medium text-base'>
                        Quản lý thông tin chủ phòng
                    </span>
                </Link>

                <Link
                    to={paths.admin.homeAdmin}
                    className='flex flex-col items-center justify-center gap-5 rounded-lg shadow-xl h-[200px] col-start-6 col-span-3'
                >
                    <img
                        src={Statistical}
                        alt='statistical'
                        className='h-[100px] w-[100px]'
                    />
                    <span className='font-medium text-base'>Thống kê</span>
                </Link>
            </div>
        </AdminLayout>
    )
}

export default HomeAdmin
