import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routes from "../../navigator/routes";
import TabNavigator from "../TabNavigator";

const Stack = createNativeStackNavigator();
function StackNavigator() {
    return <Stack.Navigator
        initialRouteName='Main'
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen
            name="Main"
            component={TabNavigator}
        />
        {
            routes.map(item => {
                return <Stack.Screen
                    key={item.name}
                    name={item.name}
                    component={item.component}
                />
            })
        }
    </Stack.Navigator>
}

export default StackNavigator;