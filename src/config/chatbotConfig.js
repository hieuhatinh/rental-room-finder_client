import { createChatBotMessage } from 'react-chatbot-kit'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CloseOutlined } from '@ant-design/icons'

import AvatarChatbot from '../assets/images/chatbot.png'
import AvatarUser from '../assets/images/user.png'
import AvatarHeaderChatbot from '../assets/images/chat-bot-header.png'
import { toggleChatbot } from '../store/slice/chatbotSlice'
import { LIMIT } from '../constants'
import { paths } from '../utils/pathsRoutes'

const HeaderChatbot = () => {
    const dispatch = useDispatch()

    const handleCloseChatbot = () => {
        dispatch(toggleChatbot())
    }

    return (
        <div className='flex items-center justify-between bg-gradient-to-r from-pink-500 to-orange-500 p-4 rounded-t-md'>
            <div className='flex items-center justify-start text-white'>
                <img
                    src={AvatarHeaderChatbot}
                    alt='chatbot header avatar'
                    className='w-7 h-7'
                />
                <span className='ml-3 text-base font-medium'>
                    Chat with Roomie Bot
                </span>
            </div>
            <CloseOutlined
                className='w-7 h-7 cursor-pointer text-white font-semibold'
                onClick={handleCloseChatbot}
            />
        </div>
    )
}

const AvartarUserComp = (props) => {
    return (
        <img
            src={AvatarUser}
            alt='avatar user'
            className='w-10 h-10 ml-3'
            {...props}
        />
    )
}

const AvatarChatbotComp = (props) => {
    return (
        <img
            src={AvatarChatbot}
            alt='avatar chatbot'
            className='w-10 h-10'
            {...props}
        />
    )
}

const CustomLink = (props) => {
    const {
        address_name,
        lon,
        lat,
        amentities,
        numberPeopleInRoom,
        radius,
        roomPrice,
    } = props.payload

    let pathToResult = `${paths.tenant.searchResult}?address_name=${address_name}
                    &lat=${lat}&lon=${lon}
                    &capacity=${numberPeopleInRoom}
                    &roomPrice=${roomPrice}
                    &page=1&limit=${LIMIT}`
    if (amentities) {
        pathToResult += `&amentities=${amentities}`
    }
    if (radius) {
        pathToResult += `&radius=${radius}`
    }

    return (
        <div className='react-chatbot-kit-chat-bot-message-container'>
            <div className='react-chatbot-kit-chat-bot-message'>
                <span>Vui lòng click vào </span>
                <Link
                    to={pathToResult}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-red-600 hover:text-red-600'
                >
                    link này
                </Link>
                <span> để đến trang kết quả</span>
            </div>
        </div>
    )
}

const chatbotConfig = {
    initialMessages: [
        createChatBotMessage(`Chào bạn, bạn muốn tìm phòng trọ ở đâu?`),
    ],
    botName: 'Roomie Bot',
    customComponents: {
        header: () => <HeaderChatbot />,
        botAvatar: (props) => <AvatarChatbotComp {...props} />,
        userAvatar: (props) => <AvartarUserComp {...props} />,
    },
    widgets: [
        {
            widgetName: 'customLink',
            widgetFunc: (props) => <CustomLink {...props} />,
        },
    ],
}

export default chatbotConfig
