import { Outlet, useParams } from 'react-router-dom'

import ChatAppLayout from '../../layouts/ChatAppLayout'
import EmptyBox from '../../assets/images/empty-box.png'
import Sidebar from '../../components/Chat/Sidebar'
import ImageGalleryModal from '../../components/Chat/ImageGalleryModal'

const ChatApp = () => {
    const params = useParams()

    return (
        <ChatAppLayout>
            <div className='grid grid-cols-8 h-screen'>
                {/* sidebar chat */}
                <div className='col-span-2 bg-white'>
                    <Sidebar />
                </div>
                <div className='flex flex-col col-span-6'>
                    {/* Content */}
                    {params.id_user ? (
                        <Outlet />
                    ) : (
                        <div className='flex items-center justify-center h-full'>
                            <img
                                src={EmptyBox}
                                alt='empty box'
                                className='h-[100px] w-[100px]'
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* show image */}
            <ImageGalleryModal />
        </ChatAppLayout>
    )
}

export default ChatApp
