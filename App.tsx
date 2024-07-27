import React from 'react';
import {
	Text,
	View,
} from 'react-native';
import { Button, Provider, Toast } from '@ant-design/react-native';
function App() {

	return <Provider>
		<View style={{ flex: 1 }}>
			<View>
				<Text>首页</Text>
			</View>
			<Button onPress={() => Toast.info('This is a toast tips')}>
				Start
			</Button>
		</View>
	</Provider>

}

export default App;
