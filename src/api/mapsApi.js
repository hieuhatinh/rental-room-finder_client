import axios from 'axios'

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?'
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse?'

const apiGetAddressFromSearchText = async ({ searchText }) => {
    try {
        const params = {
            q: searchText,
            format: 'json',
            addressdetails: 1,
            polygon_geojson: 0,
        }
        const queryString = new URLSearchParams(params).toString()

        const response = await axios.get(`${NOMINATIM_BASE_URL}${queryString}`)

        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                error.message ||
                'Something went wrong',
        )
    }
}

const apiGetAddressFromCoordinates = async ({ lat, lng }) => {
    const params = {
        lat,
        lon: lng,
        format: 'json',
    }
    const queryString = new URLSearchParams(params).toString()

    try {
        const response = await axios.get(
            `${NOMINATIM_REVERSE_URL}${queryString}`,
        )

        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
                error.message ||
                'Something went wrong',
        )
    }
}

export { apiGetAddressFromSearchText, apiGetAddressFromCoordinates }
