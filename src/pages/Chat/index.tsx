import { Button } from "@ant-design/react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View } from "react-native";

/**
 * 聊天列表
 * @param param0 
 * @returns 
 */
function Chat() {
    const navigation = useNavigation<NavigationProp<any>>();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
            <Text>Chat Screen</Text>
            <Button type="primary" onPress={() => navigation.navigate("ChatPrivate", {
                id: Date.now(),
                name: "ywh",
                age: 18
            })}>
                私聊
            </Button>
        </View>
    );
}

export default Chat;