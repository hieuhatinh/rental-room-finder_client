import React from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import axiosClient from '../api/axiosClient'
import { fetchGetAddressFromSearchText } from '../store/actions/mapsAction'
import { getNumber } from '../utils/convertValue'
import { fetchGetAmentitiesId } from '../store/actions/amentitiesAction'

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
        // gọi api lấy location
        const resultLocation = await dispatch(
            fetchGetAddressFromSearchText({
                searchText:
                    responseData.data[0].queryResult.outputContexts[0]
                        .parameters.fields['location.original'].stringValue,
            }),
        )

        // gọi api lấy id amentities mà người dùng nhập vào
        let amentities =
            responseData.data[0].queryResult.outputContexts[0].parameters.fields
                ?.amentity

        let idAmentities = null
        if (amentities) {
            idAmentities = await dispatch(
                fetchGetAmentitiesId({
                    names: amentities?.listValue.values?.map(
                        (item) => item.stringValue,
                    ),
                }),
            )
        }

        // lấy dữ liệu
        let address_name = resultLocation.payload[0].display_name
        let lon = resultLocation.payload[0].lon
        let lat = resultLocation.payload[0].lat

        let numberPeopleInRoom = getNumber(
            responseData.data[0].queryResult.outputContexts[0].parameters.fields
                ?.number_in_room.stringValue,
        )
        let radius =
            responseData.data[0].queryResult.outputContexts[0].parameters
                .fields?.['unit-length']?.structValue.fields.amount.numberValue
        let roomPrice = getNumber(
            responseData.data[0].queryResult.outputContexts[0].parameters.fields
                ?.price?.listValue.values[0].stringValue,
        )

        const botMessage = createChatBotMessage(
            'Đây là thông tin tìm kiếm của bạn: ',
            {
                widget: 'customLink',
                payload: {
                    address_name,
                    lon,
                    lat,
                    amentities: idAmentities?.payload?.amentities?.map(
                        (item) => item.id_amentity,
                    ),
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
