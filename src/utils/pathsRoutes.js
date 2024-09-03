export const paths = {
    login: '/login',
    register: '/register',
    accessDenied: '/access-denied',
    googleSuccess: '/auth/login/google/success',
    tenant: {
        homeTenant: '/',
        searchResult: '/tenant/search-result',
        roomDetail: '/room-detail/:id',
        tenantInfomation: '/tenant/infomation',
    },
    landlord: {
        homeLandlord: '/landlord/home',
        roomManagement: '/landlord/room-management',
        addRoom: '/landlord/add-room',
        editRoom: '/landlord/edit-room/:id',
    },
    shared: {
        chatApp: '/chat-app',
        chatAppIdUser: ':id_user',
    },
}
