import axiosClient from '../axiosClient'

const apiGetSomeRooms = async () => {
    try {
        const response = await axiosClient.get('/tenant/get-some-rooms')

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiSearchRooms = async ({ display_name, lat, lon, page, limit }) => {
    try {
        const response = await axiosClient.get('/tenant/search-rooms', {
            params: {
                display_name,
                lat,
                lon,
                page,
                limit,
            },
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetDetailRoom = async ({ id_room }) => {
    try {
        const response = await axiosClient.get(
            `/tenant/get-detail-room/${id_room}`,
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { apiGetSomeRooms, apiSearchRooms, apiGetDetailRoom }
