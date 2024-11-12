import { fetchGetAmentitiesId } from '../../store/actions/amentitiesAction'
import { fetchGetAddressFromSearchText } from '../../store/actions/mapsAction'
import { getNumber } from '../convertValue'

const getInfoSearchFromChatbot = async (dispatch, responseData) => {
    // gọi api lấy location
    const resultLocation = await dispatch(
        fetchGetAddressFromSearchText({
            searchText:
                responseData.outputContexts[0].parameters.fields[
                    'location.original'
                ].stringValue,
        }),
    )

    // gọi api lấy id amentities mà người dùng nhập vào
    let amentities = responseData?.outputContexts[0].parameters.fields?.amentity

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
        responseData.outputContexts[0].parameters.fields?.number_in_room
            .stringValue,
    )
    let radius =
        responseData.outputContexts[0].parameters.fields?.['unit-length']
            ?.structValue.fields.amount.numberValue
    let roomPrice = getNumber(
        responseData.outputContexts[0].parameters.fields?.price?.listValue
            .values[0].stringValue,
    )

    return {
        address_name,
        lon,
        lat,
        amentities: idAmentities?.payload?.amentities?.map(
            (item) => item.id_amentity,
        ),
        numberPeopleInRoom,
        radius,
        roomPrice,
    }
}

export default getInfoSearchFromChatbot
