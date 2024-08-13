import { View } from "react-native";
import commonStyles from "../common/styles";
import HeaderTitleScan from "../../components/HeaderTitleScan";
/**
 * 聊天列表
 * @param param0 
 * @returns 
 */
function Chat() {

    return (
        <View style={[commonStyles.pageContainer]}>
            <HeaderTitleScan title="微信"></HeaderTitleScan>
        </View>
    );
}

export default Chat;