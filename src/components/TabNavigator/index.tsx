import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from '../../pages/Chat';
import Contact from '../../pages/Contact';
import Found from '../../pages/Found';
import Mine from '../../pages/Mine';
import TabBarIcon from '../TabBarIcon';

function TabNavigator() {
    const Tab = createBottomTabNavigator();
    return <Tab.Navigator
        initialRouteName='Chat'
        screenOptions={({ route }) => ({
            keyboardHidesTabBar: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabBarIcon route={route} focused={focused} />,
            tabBarActiveTintColor: '#07c160',
            tabBarInactiveTintColor: '#010101',
            tabBarStyle: {
                backgroundColor: '#f7f7f7',
                height: 60,
                paddingBottom: 5
            },
        })}
    >
        <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
                tabBarLabel: '微信'
            }}
        />
        <Tab.Screen
            name="Contact"
            component={Contact}
            options={{
                tabBarLabel: '通讯录'
            }}
        />
        <Tab.Screen
            name="Found"
            component={Found}
            options={{
                tabBarLabel: '发现'
            }}
        />
        <Tab.Screen
            name="Mine"
            component={Mine}
            options={{
                tabBarLabel: '我'
            }}
        />
    </Tab.Navigator>
}

export default TabNavigator;