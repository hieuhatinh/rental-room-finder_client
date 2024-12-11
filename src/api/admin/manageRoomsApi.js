import axiosClient from '../axiosClient'

const apiGetUnacceptRooms = async ({ page = 1, limit = 10 }) => {
    try {
        const result = await axiosClient.get(
            `/admin/manage/rooms/get-approvals-request?page=${page}&limit=${limit}`,
        )

        return result.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiGetDetailUnacceptRoom = async ({ id_landlord, id_room }) => {
    try {
        const result = await axiosClient.get(
            `/admin/manage/rooms/get-detail-approval-request/${id_landlord}/${id_room}`,
        )

        return result.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiAcceptRequest = async ({ id_landlord, id_room }) => {
    try {
        const result = await axiosClient.patch(
            `/admin/manage/rooms/accept-request`,
            {
                id_landlord,
                id_room,
            },
        )

        return result.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiRejectRequest = async ({ id_landlord, id_room, reason }) => {
    try {
        const result = await axiosClient.patch(
            `/admin/manage/rooms/reject-request`,
            {
                id_landlord,
                id_room,
                reason,
            },
        )

        return result.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

export {
    apiGetUnacceptRooms,
    apiGetDetailUnacceptRoom,
    apiAcceptRequest,
    apiRejectRequest,
}
