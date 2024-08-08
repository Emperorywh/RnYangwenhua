import { Text, View } from "react-native";
import useBackHandler from "../../hooks/useBackHandler";
import { useRoute } from "@react-navigation/native";
/**
 * 私聊
 * @returns 
 */
function ChatPrivate() {
    const route = useRoute();
    useBackHandler();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>私聊</Text>
            <Text>{JSON.stringify(route.params)}</Text>
        </View>
    );
}

export default ChatPrivate;