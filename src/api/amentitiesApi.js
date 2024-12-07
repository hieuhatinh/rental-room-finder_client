import axiosClient from './axiosClient'

const apiGetAmentities = async () => {
    try {
        const amentities = await axiosClient.get(
            '/amentities/get-all-by-tenant',
        )

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

// landlord, admin
const apiGetAmentitiesByLandlord = async () => {
    try {
        const amentities = await axiosClient.get(
            '/amentities/all-amentities-by-landlord',
        )

        return amentities.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiAddAmentity = async ({ amentity }) => {
    try {
        const amentities = await axiosClient.post('/amentities/add-amentity', {
            amentity,
        })

        return amentities.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiGetAllAmentitiesByAdmin = async () => {
    try {
        const amentities = await axiosClient.get(
            '/amentities/all-amentities-by-admin',
        )

        return amentities.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiAcceptAmentity = async ({ id_amentity }) => {
    try {
        const amentities = await axiosClient.patch(
            '/amentities/accept-amentity',
            {
                id_amentity,
            },
        )

        return amentities.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiRefuseAmentity = async ({ id_amentity }) => {
    try {
        const amentities = await axiosClient.patch(
            '/amentities/refuse-amentity',
            {
                id_amentity,
            },
        )

        return amentities.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

export {
    apiGetAmentities,
    apiGetAmentitiesId,
    apiGetAmentitiesByLandlord,
    apiAddAmentity,
    apiGetAllAmentitiesByAdmin,
    apiAcceptAmentity,
    apiRefuseAmentity,
}
