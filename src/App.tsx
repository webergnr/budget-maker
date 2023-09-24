import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import NewBudget, {IBudget} from './screens/NewBudget';
import EditBudget from './screens/EditBudget';

export type RootStackParamList = {
  Home: undefined;
  NewBudget: undefined;
  EditBudget: {budget: IBudget};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewBudget" component={NewBudget} />
        <Stack.Screen
          name="EditBudget"
          component={EditBudget}
          // initialParams={{budget: {}}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
