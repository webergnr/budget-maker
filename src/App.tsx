import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import NewBudget from './screens/NewBudget';

export type RootStackParamList = {
  Home: undefined;
  NewBudget: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewBudget" component={NewBudget} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
