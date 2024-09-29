import axiosClient from './axiosClient'

const apiGetAmentities = async () => {
    try {
        const amentities = await axiosClient.get('/amentities/get-all')

        return amentities.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

export { apiGetAmentities }
