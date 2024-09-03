import axios from 'axios'
import axiosClient from './axiosClient'

const uploadFileApi = async (files) => {
    const url_upload = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`
    const uploadPromises = files.map((file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'chat-app-file') // Thay đổi thành upload_preset của bạn

        // Trả về promise của yêu cầu axios
        return axios.post(url_upload, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    })

    try {
        const responses = await Promise.all(uploadPromises)
        const newFiles = responses.map((response) => {
            return {
                public_id: response.data.public_id,
                url: response.data.url,
                type: response.data.resource_type,
                name: response.data.original_filename,
            }
        })

        return newFiles
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const deleteFileApi = async (public_id) => {
    try {
        const response = await axiosClient.post('/file/delete', {
            public_id: public_id,
        })

        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { uploadFileApi, deleteFileApi }
