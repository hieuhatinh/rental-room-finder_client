import React from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import axiosClient from '../api/axiosClient'
import getInfoSearchFromChatbot from '../utils/chatbot/getInfoSearchFromChatbot'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const dispatch = useDispatch()
    const currentSessionId = React.useRef(uuidv4())

    // async function deleteContext() {
    //     await axiosClient.delete('/chatbot/webhook/delete-context', {
    //         currentSessionId: currentSessionId.current,
    //     })
    // }
    // React.useEffect(() => {
    //     deleteContext()
    // }, [])

    const handleUserMessage = async (message) => {
        const responseData = await axiosClient.post('/chatbot/webhook', {
            text: message,
            currentSessionId: currentSessionId.current,
        })

        const botMessage = createChatBotMessage(
            responseData.data[0].queryResult.fulfillmentText,
        )

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }))

        const regexCheck = /session-vars$/

        if (
            regexCheck.test(
                responseData.data[0].queryResult.outputContexts[0]?.name,
            )
        ) {
            // deleteContext()
            currentSessionId.current = uuidv4()
            return handleSearchRoom(responseData)
        }
    }

    // tìm kiếm phòng sau khi đã hỏi xong người dùng
    const handleSearchRoom = async (responseData) => {
        const {
            address_name,
            lon,
            lat,
            amentities,
            numberPeopleInRoom,
            radius,
            roomPrice,
        } = await getInfoSearchFromChatbot(
            dispatch,
            responseData.data[0].queryResult,
        )

        const botMessage = createChatBotMessage(
            'Đây là thông tin tìm kiếm của bạn: ',
            {
                widget: 'customLink',
                payload: {
                    address_name,
                    lon,
                    lat,
                    amentities,
                    numberPeopleInRoom,
                    radius,
                    roomPrice,
                },
            },
        )

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }))
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: { handleUserMessage, handleSearchRoom },
                })
            })}
        </div>
    )
}

export default ActionProvider
