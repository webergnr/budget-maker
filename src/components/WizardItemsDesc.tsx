import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {presetItems} from '../constants';
import {IItem} from '../screens/NewBudget';
import TextBigQuestion from './TextBigQuestion';

const ButtonContinue = ({...rest}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 340,
        padding: 10,
        backgroundColor: '#88aa88',
        borderRadius: 8,
      }}
      {...rest}>
      <Text style={{fontSize: 18}}>Continuar</Text>
    </TouchableOpacity>
  );
};

const WizardItemsDesc = ({
  selectedItems,
  setItemsDesc,
  nextWizard,
}: {
  selectedItems: string[];
  setItemsDesc(a: IItem[]): void;
  nextWizard(): void;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {selectedItems.map((x, i) => {
        return (
          i === currentQuestion && (
            <>
              <TextBigQuestion>{presetItems[x].question}</TextBigQuestion>
              {presetItems[x].items.map((x, i) => {
                return <Text>{x}</Text>;
              })}
              <ButtonContinue onPress={handleNextQuestion} key={i} />
            </>
          )
        );
      })}
    </View>
  );
};

export default WizardItemsDesc;
