import { createChatBotMessage } from 'react-chatbot-kit'
import { useDispatch } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'

import AvatarChatbot from '../assets/images/chatbot.png'
import AvatarUser from '../assets/images/user.png'
import AvatarHeaderChatbot from '../assets/images/chat-bot-header.png'
import { toggleChatbot } from '../store/slice/chatbotSlice'

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
}

export default chatbotConfig
