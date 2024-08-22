const saveUserInfoToLocalStorage = (info) => {
    localStorage.setItem('userInfo', JSON.stringify(info))
}

const getUserInfoFromLocalStorage = () => {
    const infoUser = localStorage.getItem('userInfo')
    return JSON.parse(infoUser)
}

const removeUserInfoFromLocalStorage = () => {
    localStorage.removeItem('userInfo')
}

export {
    saveUserInfoToLocalStorage,
    getUserInfoFromLocalStorage,
    removeUserInfoFromLocalStorage,
}
