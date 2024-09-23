import moment from 'moment'

const formattedDate = (date) => moment(date).format('DD-MM-YYYY HH:mm:ss')

const convertToVnd = (number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    return formatter.format(number)
}

export { formattedDate, convertToVnd }
