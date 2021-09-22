import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {presetItems} from '../constants';
import SingleItem from './SingleItem';
import TextBigQuestion from './TextBigQuestion';

const WizardPresets: React.FC<any> = ({nextWizard, setPresets}) => {
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
          {Object.keys(presetItems).map((x, i) => {
            return (
              <SingleItem
                key={i}
                name={x}
                isChecked={selectedPresets.indexOf(x) > -1}
                onPress={() => toggleSelectedPreset(x)}
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
            setPresets(selectedPresets);
            nextWizard();
          }}>
          <Text style={{fontSize: 18}}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WizardPresets;
