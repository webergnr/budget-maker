import React from 'react';
import {Text, View} from 'react-native';
import {IBudget} from '../screens/NewBudget';
import FormInput from './FormInput';
import TextBigQuestion from './TextBigQuestion';

const WizardReview = ({
  setBudget,
  currentBudget,
}: {
  setBudget(budget: IBudget): void;
  currentBudget: IBudget;
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <TextBigQuestion>Revise o or&ccedil;amento</TextBigQuestion>
      <View style={{padding: 10, width: '100%'}}>
        <FormInput fieldName="Nome do cliente" value={currentBudget.name} />
        <FormInput fieldName="Telefone" value={currentBudget.phone} />
        <FormInput
          fieldName="Localiza&ccedil;&atilde;o"
          value={currentBudget.place}
        />
        <FormInput
          fieldName="Metros do po&ccedil;o"
          value={currentBudget.size}
        />
        <FormInput
          fieldName="Condi&ccedil;&otilde;es de pagamento"
          value={currentBudget.payment}
        />
        <Text>{JSON.stringify(currentBudget)}</Text>
      </View>
    </View>
  );
};

export default WizardReview;
