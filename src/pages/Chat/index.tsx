import { Text, View } from "react-native";
import commonStyles from "../common/styles";
import HeaderTitleScan from "../../components/HeaderTitleScan";
import { useState } from "react";
/**
 * 聊天列表
 * @param param0 
 * @returns 
 */
function Chat() {

    const [scanResult, setScanResult] = useState('');

    return (
        <View style={[commonStyles.pageContainer]}>
            <HeaderTitleScan title="微信" onScanSuccess={result => setScanResult(result)}></HeaderTitleScan>
            <Text>扫码结果：{scanResult}</Text>
        </View>
    );
}

export default Chat;