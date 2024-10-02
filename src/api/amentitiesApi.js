import axiosClient from './axiosClient'

const apiGetAmentities = async () => {
    try {
        const amentities = await axiosClient.get('/amentities/get-all')

        return amentities.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiGetAmentitiesId = async ({ names }) => {
    try {
        const amentities = await axiosClient.get(
            '/amentities/get-amentities-id',
            {
                params: { names },
            },
        )

        return amentities.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

export { apiGetAmentities, apiGetAmentitiesId }
