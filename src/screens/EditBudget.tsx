import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from '../App';
import WizardReview from '../components/WizardReview';
import {addBudget, removeBudget} from '../utils/storageBudget';
import {IBudget} from './NewBudget';

type EditScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditBudget'
>;

type Props = {
  navigation: EditScreenNavigationProp;
  route: any;
};

const EditBudget = ({route, navigation}: Props) => {
  const {budget} = route.params;

  const handleSaveEdit = async (b: IBudget) => {
    await removeBudget(b);
    await addBudget(b);
    navigation.goBack();
  };

  return <WizardReview currentBudget={budget} setBudget={handleSaveEdit} />;
};

export default EditBudget;
