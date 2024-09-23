import axiosClient from '../axiosClient'

const apiLandlordAddRoom = async ({ ...values }) => {
    try {
        const response = await axiosClient.post(
            '/landlord/manage/create-new-room',
            {
                ...values,
            },
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetAllRoomsOfLandlord = async ({ limit, page }) => {
    try {
        const response = await axiosClient.get(
            `/landlord/manage/get-all-rooms?page=${page}&limit=${limit}`,
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetDetailRoomByLandlord = async ({ id_room }) => {
    try {
        const response = await axiosClient.get(
            `/landlord/manage/room-detail/${id_room}`,
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiDeleteRoom = async ({ id_room }) => {
    try {
        const response = await axiosClient.delete(
            `/landlord/manage/delete-room/${id_room}`,
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    apiLandlordAddRoom,
    apiGetAllRoomsOfLandlord,
    apiGetDetailRoomByLandlord,
    apiDeleteRoom,
}
