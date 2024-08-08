import React, { useEffect } from 'react';
import { Provider } from '@ant-design/react-native';
import CodePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/components/StackNavigator';
import { StatusBar } from 'react-native';
const App = () => {

	useEffect(() => {
		CodePush.notifyAppReady();
	}, []);

	return (
		<Provider>
			<NavigationContainer>
				<StatusBar
					barStyle="dark-content"
					backgroundColor="#ededed"
				/>
				<StackNavigator></StackNavigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
