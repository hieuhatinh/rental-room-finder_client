import {
    FileImageOutlined,
    UserOutlined,
    VideoCameraFilled,
} from '@ant-design/icons'
import { Avatar, Badge } from 'antd'
import { generatePath, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import StatusIndicator from '../StatusIndicator'
import { paths } from '../../utils/pathsRoutes'
import { selectAuth } from '../../store/selector/authSelector'

const CardUser = ({ data }) => {
    const authState = useSelector(selectAuth)

    const receiverInfo =
        authState.userInfo.id_user !== data.user1._id ? data.user1 : data.user2
    const isReceiverOnline = authState?.onlineUsers?.includes(receiverInfo?._id)

    const pathToConversation = generatePath(
        `${paths.shared.chatApp}/${paths.shared.chatAppIdUser}`,
        {
            id_user: receiverInfo._id,
        },
    )

    return (
        <Link
            to={pathToConversation}
            className='p-4 hover:bg-slate-200 cursor-pointer inline-block w-full'
        >
            <Badge
                count={data?.unseenMsg}
                overflowCount={99}
                offset={[50, 20]}
                className='flex items-center gap-4'
            >
                <StatusIndicator position='right-1' isOnline={isReceiverOnline}>
                    <Avatar icon={<UserOutlined />} size={44} />
                </StatusIndicator>
                <div>
                    <span className='font-semibold text-base block'>
                        {receiverInfo?.full_name || receiverInfo?.username}
                    </span>
                    {data.lastMsg?.text && (
                        <p className='text-sm text-gray-500 text-ellipsis overflow-hidden text-nowrap w-[200px]'>
                            {data.lastMsg?.text}
                        </p>
                    )}
                    {data.lastMsg?.filesUpload.at(-1)?.type === 'image' && (
                        <div className='flex items-center gap-2'>
                            <FileImageOutlined className='text-sm text-gray-500' />
                            <span className='text-sm text-gray-500'>Image</span>
                        </div>
                    )}
                    {data.lastMsg?.filesUpload.at(-1)?.type === 'video' && (
                        <div className='flex items-center gap-2'>
                            <VideoCameraFilled className='text-sm text-gray-500' />
                            <span className='text-sm text-gray-500'>Video</span>
                        </div>
                    )}
                </div>
            </Badge>
        </Link>
    )
}

export default CardUser
