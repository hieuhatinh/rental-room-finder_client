import { Link } from 'react-router-dom'

import LandlordLayout from '../../layouts/LandlordLayout'
import { paths } from '../../utils/pathsRoutes'

import Notification from '../../assets/images/notification.png'
import ChatApp from '../../assets/images/chat-app.png'
import ManageRoom from '../../assets/images/manage-room.png'
import Statistical from '../../assets/images/statistical.png'

const HomeLandlord = () => {
    return (
        <LandlordLayout>
            <div className='grid grid-cols-12 gap-10'>
                <Link
                    to={paths.landlord.homeLandlord}
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
                    to={paths.shared.chatApp}
                    className='flex flex-col items-center justify-center gap-5 rounded-lg shadow-xl h-[200px] col-span-3'
                >
                    <img
                        src={ChatApp}
                        alt='request approval'
                        className='h-[100px] w-[100px]'
                    />
                    <span className='font-medium text-base'>Chat</span>
                </Link>

                <Link
                    to={paths.landlord.roomManagement}
                    className='flex flex-col items-center justify-center gap-5 rounded-lg shadow-xl h-[200px] col-span-3'
                >
                    <img
                        src={ManageRoom}
                        alt='request approval'
                        className='h-[100px] w-[100px]'
                    />
                    <span className='font-medium text-base'>
                        Quản lý phòng trọ
                    </span>
                </Link>

                <Link
                    to={paths.landlord.homeLandlord}
                    className='flex flex-col items-center justify-center gap-5 rounded-lg shadow-xl h-[200px] col-start-5 col-span-3'
                >
                    <img
                        src={Statistical}
                        alt='request approval'
                        className='h-[100px] w-[100px]'
                    />
                    <span className='font-medium text-base'>Thống kê</span>
                </Link>
            </div>
        </LandlordLayout>
    )
}

export default HomeLandlord
