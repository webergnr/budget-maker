import React from 'react';
import {View} from 'react-native';
import TextBigQuestion from './TextBigQuestion';
import TextInputQuestion from './TextInputQuestion';

const WizardPlace = ({
  setPlace,
  nextWizard,
}: {
  setPlace(s: string): void;
  nextWizard(): void;
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextBigQuestion>Onde ser&aacute; o po&ccedil;o?</TextBigQuestion>
      <View style={{padding: 10, width: '100%'}}>
        <TextInputQuestion
          onChangeText={_ => setPlace(_)}
          onEndEditing={() => nextWizard()}
        />
      </View>
    </View>
  );
};

export default WizardPlace;
