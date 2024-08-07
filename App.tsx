import React, { useEffect } from 'react';
import { Provider } from '@ant-design/react-native';
import CodePush from 'react-native-code-push';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Chat from './src/pages/Chat';
import Contact from './src/pages/Contact';
import Found from './src/pages/Found';
import Mine from './src/pages/Mine';
import icon from './src/icon';
import { SvgXml } from 'react-native-svg';

const Tab = createBottomTabNavigator();
const App = () => {

	useEffect(() => {
		CodePush.notifyAppReady();
	}, [])

	return <Provider>
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName='Chat'
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						if (route.name === 'Mine') {
							return <SvgXml
								width="28"
								height="28"
								xml={focused ? icon.User_Active : icon.User}
							/>
						} else if (route.name === 'Contact') {
							return <SvgXml
								width="28"
								height="28"
								xml={focused ? icon.Contact_Active : icon.Contact}
							/>
						} else if (route.name === 'Found') {
							return <SvgXml
								width="28"
								height="28"
								xml={focused ? icon.Found_Active : icon.Found}
							/>
						} else {
							return <SvgXml
								width="28"
								height="28"
								xml={focused ? icon.Chat_Active : icon.Chat}
							/>
						}
					},
					tabBarActiveTintColor: '#07c160',
					tabBarInactiveTintColor: '#010101',
					tabBarStyle: {
						backgroundColor: '#f7f7f7',
						height: 50
					}
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
		</NavigationContainer>
	</Provider>
}

export default App;
