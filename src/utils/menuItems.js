import { BellOutlined, HomeOutlined, WechatOutlined } from '@ant-design/icons'

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const menuItemsTenant = [
    getItem('Trang chủ', '1', <HomeOutlined />),
    getItem('Chat', '2', <WechatOutlined />),
    getItem('Thông báo', '3', <BellOutlined />),
]

export { menuItemsTenant }
