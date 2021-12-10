import React from 'react';
import {View} from 'react-native';
import TextBigQuestion from './TextBigQuestion';
import TextInputQuestion from './TextInputQuestion';

const WizardSize = ({
  setSize,
  nextWizard,
}: {
  setSize(s: string): void;
  nextWizard(): void;
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextBigQuestion>
        Quantos metros de perfura&ccedil;&atilde;o?
      </TextBigQuestion>
      <View style={{padding: 10, width: '33%'}}>
        <TextInputQuestion
          keyboardType="number-pad"
          onChangeText={_ => setSize(_)}
          onEndEditing={() => nextWizard()}
        />
      </View>
    </View>
  );
};

export default WizardSize;
