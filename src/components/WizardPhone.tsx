import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import TextBigQuestion from './TextBigQuestion';
import TextInputQuestion from './TextInputQuestion';

const WizardPhone = ({
  setPhone,
  nextWizard,
}: {
  setPhone(s: string): void;
  nextWizard(): void;
}) => {
  const [hasPhone, setHasPhone] = useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!hasPhone && (
        <>
          <TextBigQuestion>Tem telefone?</TextBigQuestion>
          <View style={{padding: 10, flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#aa8888',
                paddingVertical: 10,
                width: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                borderWidth: 2,
                borderColor: '#2f2f2f',
                marginRight: 10,
              }}
              onPress={() => {
                setPhone('');
                nextWizard();
              }}>
              <Text style={{fontSize: 18}}>N&atilde;o</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#88aa88',
                paddingVertical: 10,
                width: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                borderWidth: 2,
                borderColor: '#2f2f2f',
                marginRight: 10,
              }}
              onPress={() => {
                setHasPhone(true);
              }}>
              <Text style={{fontSize: 18}}>Sim</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {hasPhone && (
        <>
          <TextBigQuestion>Qual &eacute; o telefone?</TextBigQuestion>
          <View style={{padding: 10, width: '100%'}}>
            <TextInputQuestion
              keyboardType="number-pad"
              onChangeText={_ => setPhone(_)}
              onEndEditing={() => nextWizard()}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default WizardPhone;
