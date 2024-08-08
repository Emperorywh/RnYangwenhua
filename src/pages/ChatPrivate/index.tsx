import { useEffect } from "react";
import { Text, View } from "react-native";

function ChatPrivate() {
    useEffect(() => {
        console.log("ChatPrivate 挂载")
        return () => {
            console.log("ChatPrivate 卸载")
        }
    }, []);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>私聊</Text>
        </View>
    );
}

export default ChatPrivate;