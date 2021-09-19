import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import TextBigQuestion from './TextBigQuestion';

const presetItems = {
  bomba: ['Bomba leao 12"', 'Bomba geomecanica 6"'],
  painel: ['painel 1', 'painel 2', 'painel 3'],
  tubo: ['tubo 1', 'tubo 2', 'tubo 3'],
  flange: ['flange 1', 'flange 2', 'flange 3'],
  cabo: ['cabo 1', 'cabo 2', 'cabo 3'],
  role: ['role 1', 'role 2', 'role 3'],
  teste: ['teste 1', 'teste 2', 'teste 3'],
  blabla: ['blabla 1', 'blabla 2', 'blabla 3'],
  'outro teste': ['outro teste 1', 'outro teste 2', 'outro teste 3'],
};

const SingleItem = ({name, isChecked, ...rest}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={{
        height: 50,
        width: 330,
        backgroundColor: '#ddd',
        borderRadius: 8,
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#888',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text style={{fontSize: 18}}>{name}</Text>
      {isChecked && <Text style={{fontSize: 22}}>✅</Text>}
    </TouchableOpacity>
  );
};

const WizardPresets = () => {
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);

  const toggleSelectedPreset = (s: string) => {
    if (selectedPresets.indexOf(s) === -1) {
      setSelectedPresets([...selectedPresets, s]);
    } else {
      setSelectedPresets([...selectedPresets.filter(f => f !== s)]);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextBigQuestion>Quais items?</TextBigQuestion>
      <View style={{height: 380}}>
        <ScrollView style={{}}>
          {Object.keys(presetItems).map(i => {
            return (
              <SingleItem
                name={i}
                isChecked={selectedPresets.indexOf(i) > -1}
                onPress={() => toggleSelectedPreset(i)}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={{marginTop: 40}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 340,
            padding: 10,
            backgroundColor: '#88aa88',
            borderRadius: 8,
          }}
          onPress={() => {
            console.log('n');
          }}>
          <Text style={{fontSize: 18}}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WizardPresets;
