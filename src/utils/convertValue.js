import moment from 'moment'

const formattedDate = (date) => moment(date).format('DD-MM-YYYY HH:mm:ss')
const formattedBirthDate = (date) => moment(date).format('DD-MM-YYYY')

const convertToVnd = (number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    return formatter.format(number)
}

const convertToKilometers = (meters) => {
    return (meters / 1000).toFixed(3)
}

export { formattedDate, formattedBirthDate, convertToVnd, convertToKilometers }
