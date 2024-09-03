const searchUsersInSidebar = ({ allUser, authState, debouncedSearchText }) => {
    const results = allUser.filter((item) => {
        const receiverInfo =
            authState.userInfo.id_user !== item.user1._id
                ? item.user1
                : item.user2
        return (
            receiverInfo?.username.toLowerCase() ||
            receiverInfo?.full_name.toLowerCase()
        ).includes(debouncedSearchText.toLowerCase())
    })

    return results
}

const customConversations = ({ data, authState }) => {
    return data.map((conversationUser, index) => {
        if (conversationUser.user1?._id === conversationUser.user2?._id) {
            return {
                ...conversationUser,
                userDetails: conversationUser.user1,
            }
        } else if (
            conversationUser.user2?._id !== authState.userInfo?.id_user
        ) {
            return {
                ...conversationUser,
                userDetails: conversationUser.user2,
            }
        } else {
            return {
                ...conversationUser,
                userDetails: conversationUser.user1,
            }
        }
    })
}

export { searchUsersInSidebar, customConversations }
