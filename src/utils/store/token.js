import Cookies from 'js-cookie'

// lưu token vào cookies
const saveTokenToCookies = (token) => {
    Cookies.set('jwtToken', token, { expires: 1 })
}

// Lấy token từ cookies
const getTokenFromCookies = () => {
    return Cookies.get('jwtToken')
}

// Xóa token từ cookies khi logout
const removeTokenFromCookies = () => {
    Cookies.remove('jwtToken')
}

export { saveTokenToCookies, getTokenFromCookies, removeTokenFromCookies }
