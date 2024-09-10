import axiosClient from '../axiosClient'
import { apiUploadSingleFile } from '../fileApi'

const apiAddNewLandlord = async ({
    username,
    password,
    full_name,
    gender,
    profile_img,
    birth_date,
    phone_number,
}) => {
    try {
        const url = await apiUploadSingleFile(profile_img)

        const newLandlord = await axiosClient.post(
            '/admin/manage/add-landlord',
            {
                username,
                password,
                full_name,
                gender,
                profile_img: url,
                birth_date,
                phone_number,
            },
        )

        return newLandlord.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiGetLandlords = async ({ page = 1, limit = 10 }) => {
    try {
        const result = await axiosClient.get(
            `/admin/manage/get-landlords/${page}/${limit}`,
        )

        return result.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiGetInfoLandlord = async ({ idLandlord }) => {
    try {
        const result = await axiosClient.get(
            `/admin/manage/get-landlord-by-id/${idLandlord}`,
        )

        return result.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiUpdateInfoLandlord = async ({
    idLandlord,
    full_name,
    address_name,
    phone_number,
    birth_date,
}) => {
    try {
        const result = await axiosClient.put(
            `/admin/manage/update-info-landlord/${idLandlord}`,
            {
                full_name,
                address_name,
                phone_number,
                birth_date,
            },
        )

        return result.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

const apiDeleteLandlord = async ({ idLandlord }) => {
    try {
        const result = await axiosClient.delete(
            `/admin/manage/delete-landlord/${idLandlord}`,
        )

        return result.data
    } catch (error) {
        throw new Error(error.response?.data.message || error)
    }
}

export {
    apiAddNewLandlord,
    apiGetLandlords,
    apiGetInfoLandlord,
    apiUpdateInfoLandlord,
    apiDeleteLandlord,
}
