import React from 'react'
import axiosClient from '../api/axiosClient'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleUserMessage = async (message) => {
        const responseData = await axiosClient.post('/chatbot/webhook', {
            text: message,
        })

        console.log(responseData)

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
                responseData.data[0].queryResult.outputContexts[0].name,
            )
        ) {
            return handleSearchRoom(responseData)
        }
    }

    const handleSearchRoom = async (responseData) => {
        const resultRooms = await axiosClient.post(
            '/room/search-rooms-by-chatbot',
            {
                data: responseData.data[0].queryResult.outputContexts[0]
                    .parameters.fields,
            },
        )

        const botMessage = createChatBotMessage('Kết quả đã có')

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }))

        console.log(resultRooms)
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
