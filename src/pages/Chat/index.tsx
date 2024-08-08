import { Button } from "@ant-design/react-native";
import { useEffect } from "react";
import { Text, View } from "react-native";

function Chat({ navigation }: any) {

    useEffect(() => {
        console.log("Chat 挂载")
        return () => {
            console.log("Chat 卸载")
        }
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Chat Screen</Text>
            <Button type="primary" onPress={() => navigation.navigate('ChatPrivate')}>
                私聊
            </Button>
        </View>
    );
}

export default Chat;