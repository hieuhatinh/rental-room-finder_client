import DetailRoom from '../pages/Tenant/DetailRoom'
import HomeTenant from '../pages/Tenant/HomeTenant'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import SearchResult from '../pages/Tenant/SearchResult'
import HomeLandlord from '../pages/Landlord/HomeLanlord'
import { paths } from '../utils/pathsRoutes'
import GoogleSuccessLoading from '../pages/Loading/GoogleSuccessLoading'
import ChatApp from '../pages/Chat'
import MessagePage from '../pages/Chat/MessagePage'
import HomeAdmin from '../pages/Admin/HomeAdmin'
import Information from '../pages/Tenant/Information'
import RoomApprovalsRequest from '../pages/Admin/MangeRooms/RoomApprovalsRequest'
import DetailApprovalResquest from '../pages/Admin/MangeRooms/DetailApprovalRequest'
import ManageLandlords from '../pages/Admin/ManageLandlords/ManageLandlords'
import EditProfileLandlord from '../pages/Admin/ManageLandlords/EditProfileLandlord'
import AddLandlord from '../pages/Admin/ManageLandlords/AddLandlord'
import RoomManagement from '../pages/Landlord/ManageRooms/RoomManagement'
import AddNewRoom from '../pages/Landlord/ManageRooms/AddNewRoom'
import DetailRoomLandlord from '../pages/Landlord/ManageRooms/DetailRoomLandlord'
import AllAmentities from '../pages/Admin/Amentities/AllAmentity'
import OthersPost from '../pages/Tenant/FindRoommate/OthersPost'
import MyPosts from '../pages/Tenant/FindRoommate/MyPosts'

const authRoutes = [
    {
        component: Login,
        path: paths.login,
    },
    {
        component: Register,
        path: paths.register,
    },
    {
        component: GoogleSuccessLoading,
        path: paths.googleSuccess,
    },
]

const tenantPublicRoutes = [
    {
        component: HomeTenant,
        path: paths.tenant.homeTenant,
    },
    {
        component: SearchResult,
        path: paths.tenant.searchResult,
    },
    {
        component: DetailRoom,
        path: paths.tenant.roomDetail,
    },
]

const tenantPrivateRoute = [
    {
        component: Information,
        path: paths.tenant.tenantInfomation,
    },
    {
        component: OthersPost,
        path: paths.tenant.findRoommateOtherPosts,
    },
    {
        component: MyPosts,
        path: paths.tenant.findRoommateMyPosts,
    },
]

const landlordRoutes = [
    {
        component: HomeLandlord,
        path: paths.landlord.homeLandlord,
    },
    {
        component: RoomManagement,
        path: paths.landlord.roomManagement,
    },
    {
        component: AddNewRoom,
        path: paths.landlord.addRoom,
    },
    {
        component: DetailRoomLandlord,
        path: `${paths.landlord.roomDetail + paths.landlord.idRoom}`,
    },
]

const sharedPrivateRoutes = [
    {
        component: ChatApp,
        path: paths.shared.chatApp,
        elements: [
            {
                component: MessagePage,
                path: paths.shared.chatAppIdUser,
            },
        ],
    },
]

const adminRoutes = [
    {
        component: HomeAdmin,
        path: paths.admin.homeAdmin,
    },
    {
        component: ManageLandlords,
        path: paths.admin.manageLandlords,
    },
    {
        component: EditProfileLandlord,
        path: `${paths.admin.editProfileLandlord + paths.admin.idLandlord}`,
    },
    {
        component: AddLandlord,
        path: paths.admin.addLandlord,
    },
    {
        component: RoomApprovalsRequest,
        path: paths.admin.roomApprovalsRequest,
    },
    {
        component: DetailApprovalResquest,
        path: `${
            paths.admin.detailApprovalRequest +
            paths.admin.idLandlord +
            paths.admin.idRoom
        }`,
    },
    {
        component: AllAmentities,
        path: paths.admin.allAmentities,
    },
]

export {
    tenantPublicRoutes,
    landlordRoutes,
    adminRoutes,
    authRoutes,
    sharedPrivateRoutes,
    tenantPrivateRoute,
}
