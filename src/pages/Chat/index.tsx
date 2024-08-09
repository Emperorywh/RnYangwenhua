import { Button } from "@ant-design/react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";
import { todoListState } from "../../store/todoList";
import { useRecoilState } from "recoil";
import Input from "@ant-design/react-native/lib/input-item/Input";
/**
 * 聊天列表
 * @param param0 
 * @returns 
 */
function Chat() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [value, setValue] = useState('')
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text>Chat Screen</Text>
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
            <Input
                placeholder="请输入内容"
                value={value}
                onChangeText={setValue}
            />
            <Button style={{ marginBottom: 10 }} type="primary" onPress={() => {
                setTodoList([...todoList, { id: '1111111111111', content: value }]);
                setValue('');
            }}>
                添加
            </Button>
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