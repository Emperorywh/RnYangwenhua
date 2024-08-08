import { Text, View } from "react-native";
import useBackHandler from "../../hooks/useBackHandler";
/**
 * 私聊
 * @returns 
 */
function ChatPrivate() {

    useBackHandler();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>私聊</Text>
        </View>
    );
}

export default ChatPrivate;