import React, { useEffect } from 'react';
import { Provider } from '@ant-design/react-native';
import CodePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/components/StackNavigator';
import { StatusBar } from 'react-native';
import { RecoilRoot } from 'recoil';
const App = () => {

	useEffect(() => {
		CodePush.notifyAppReady();
	}, []);

	return (
		<RecoilRoot>
			<Provider>
				<NavigationContainer>
					<StatusBar
						barStyle="dark-content"
						backgroundColor="#ededed"
					/>
					<StackNavigator></StackNavigator>
				</NavigationContainer>
			</Provider>
		</RecoilRoot>
	);
};

export default App;
