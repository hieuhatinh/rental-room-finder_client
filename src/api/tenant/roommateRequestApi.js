import axiosClient from '../axiosClient'

const apiGetAllRequest = async (values) => {
    try {
        const response = await axiosClient.get(
            `/tenant/roommate-request/get-all-request`,
            {
                params: values,
            },
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetMyPostsRequest = async (values) => {
    try {
        const response = await axiosClient.get(
            `/tenant/roommate-request/get-my-posts`,
            {
                params: values,
            },
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiCreateRoommateRequest = async (values) => {
    try {
        const response = await axiosClient.post(
            `/tenant/roommate-request/new-request`,
            { ...values },
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiSearchRoommate = async (values) => {
    try {
        const response = await axiosClient.get(
            `/tenant/roommate-request/search`,
            { params: { ...values } },
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiDeletePost = async (values) => {
    try {
        const response = await axiosClient.delete(
            `/tenant/roommate-request/delete/${values.id_tenant}/${values.id}`,
        )

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    apiGetAllRequest,
    apiGetMyPostsRequest,
    apiCreateRoommateRequest,
    apiSearchRoommate,
    apiDeletePost,
}
