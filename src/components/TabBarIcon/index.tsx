import { SvgXml } from "react-native-svg";
import icon from "../../icon";

/**
 * 底部 tabBar 图标
 * @param param0 
 * @returns 
 */
const TabBarIcon = ({ route, focused }: any) => {
    let iconXml;
    switch (route.name) {
        case 'Chat':
            iconXml = focused ? icon.Chat_Active : icon.Chat;
            break;
        case 'Contact':
            iconXml = focused ? icon.Contact_Active : icon.Contact;
            break;
        case 'Found':
            iconXml = focused ? icon.Found_Active : icon.Found;
            break;
        case 'Mine':
            iconXml = focused ? icon.User_Active : icon.User;
            break;
        default:
            iconXml = icon.Chat;
    }
    return <SvgXml width="28" height="28" xml={iconXml} />;
};

export default TabBarIcon;