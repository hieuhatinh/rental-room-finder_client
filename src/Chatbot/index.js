import { Tooltip } from 'antd'
import Chatbot from 'react-chatbot-kit'
import { useDispatch, useSelector } from 'react-redux'
import 'react-chatbot-kit/build/main.css'
import './chatbot.css'

import chatbotConfig from '../config/chatbotConfig'
import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import ChatbotAvatarConversation from '../assets/images/chat-bot-header.png'
import { selectChatbot } from '../store/selector/authSelector'
import { toggleChatbot } from '../store/slice/chatbotSlice'

const ChatbotUI = () => {
    const dispatch = useDispatch()
    const chatbotState = useSelector(selectChatbot)

    const handleOpenChatbot = () => {
        dispatch(toggleChatbot())
    }

    return (
        <div className='fixed bottom-5 right-5'>
            {chatbotState.isChatbotOpen && (
                <Chatbot
                    config={chatbotConfig}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            )}
            {!chatbotState.isChatbotOpen && (
                <Tooltip
                    title='Hãy chat với tôi ngay để tìm phòng trọ theo ý bạn'
                    placement='topRight'
                    defaultOpen
                    color='#fbbf24'
                    zIndex={0}
                >
                    <img
                        src={ChatbotAvatarConversation}
                        alt='chatbot avatar conversation'
                        className='w-[80px] h-[80px] cursor-pointer'
                        onClick={handleOpenChatbot}
                    />
                </Tooltip>
            )}
        </div>
    )
}

export default ChatbotUI
