export const paths = {
    login: '/login',
    register: '/register',
    tenant: {
        homeTenant: '/',
        searchResult: '/tenant/search-result',
        roomDetail: '/room-detail/:id',
    },
    landlord: {
        homeLandlord: '/landlord/home',
        roomManagement: '/landlord/room-management',
        addRoom: '/landlord/add-room',
        editRoom: '/landlord/edit-room/:id',
    },
    accessDenied: '/access-denied',
    googleSuccess: '/auth/login/google/success',
}

export const generatePath = (path, obj) => {
    const entries = Object.entries(obj)
    for (let [key, value] in entries) {
        path = path.replace(`:${key}`, value)
    }
    return path
}
