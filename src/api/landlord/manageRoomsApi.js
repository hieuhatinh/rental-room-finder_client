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

export { apiLandlordAddRoom }
