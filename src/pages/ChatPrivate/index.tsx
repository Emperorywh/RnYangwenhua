import { Text, View } from "react-native";
import useBackHandler from "../../hooks/useBackHandler";
import { useRoute } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { todoListSelector, todoListState } from "../../store/todoList";
/**
 * 私聊
 * @returns 
 */
function ChatPrivate() {
    const todoList = useRecoilValue(todoListState);
    const todoListCount = useRecoilValue(todoListSelector);
    const route = useRoute();
    useBackHandler();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginVertical: 10 }}>
                <View>
                    <Text>待办{todoListCount}</Text>
                </View>
            </View>
            <View style={{ marginVertical: 10 }}>
                <View>
                    <Text>TODOLIST</Text>
                </View>
                {
                    todoList.map(item => {
                        return <View key={item.id}>
                            <Text>{`[id:${item.id}]-[${item.content}]`}</Text>
                        </View>
                    })
                }
            </View>
            <Text>私聊</Text>
            <Text>{JSON.stringify(route.params)}</Text>
        </View>
    );
}

export default ChatPrivate;