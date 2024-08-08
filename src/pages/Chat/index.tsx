import { Button } from "@ant-design/react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

/**
 * 聊天列表
 * @param param0 
 * @returns 
 */
function Chat() {
    const navigation = useNavigation<NavigationProp<any>>();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Chat Screen</Text>
            <Button type="primary" onPress={() => navigation.navigate("ChatPrivate")}>
                私聊
            </Button>
        </View>
    );
}

export default Chat;