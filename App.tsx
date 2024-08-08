import React, { useEffect } from 'react';
import { Provider } from '@ant-design/react-native';
import CodePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/components/StackNavigator';
const App = () => {

	useEffect(() => {
		CodePush.notifyAppReady();
	}, []);

	return (
		<Provider>
			<NavigationContainer>
				<StackNavigator></StackNavigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
