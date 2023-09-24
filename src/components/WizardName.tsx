import React from 'react';
import {View} from 'react-native';
import TextBigQuestion from './TextBigQuestion';
import TextInputQuestion from './TextInputQuestion';

const WizardName = ({
  setName,
  nextWizard,
}: {
  setName(s: string): void;
  nextWizard(): void;
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextBigQuestion>Qual o nome do cliente?</TextBigQuestion>
      <View style={{padding: 10, width: '100%'}}>
        <TextInputQuestion
          autoFocus
          onChangeText={_ => setName(_)}
          onEndEditing={() => nextWizard()}
        />
      </View>
    </View>
  );
};

export default WizardName;
