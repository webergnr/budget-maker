import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {presetItems} from '../constants';
import {IItem} from '../screens/NewBudget';
import SingleItem from './SingleItem';
import TextBigQuestion from './TextBigQuestion';

export const ButtonContinue = ({...rest}) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 10,
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

  const [currentSelectedOption, setCurrentSelectedOption] = useState('');

  const [currentOptionsSubset, setCurrentOptionsSubset] = useState<IItem[]>([]);

  const handleNextQuestion = () => {
    if (currentQuestion !== selectedItems.length - 1) {
      setCurrentOptionsSubset([
        ...currentOptionsSubset,
        {
          name: selectedItems[currentQuestion],
          description: currentSelectedOption,
          qty: 0,
          qtyType: presetItems[selectedItems[currentQuestion]].qtyType,
          value: 0,
        },
      ]);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setItemsDesc([
        ...currentOptionsSubset,
        {
          name: selectedItems[currentQuestion],
          description: currentSelectedOption,
          qty: 0,
          qtyType: presetItems[selectedItems[currentQuestion]].qtyType,
          value: 0,
        },
      ]);
      nextWizard();
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {selectedItems.map((x, i) => {
        return (
          i === currentQuestion && (
            <React.Fragment key={i}>
              <TextBigQuestion>{presetItems[x].question}</TextBigQuestion>
              <View style={{height: 380}}>
                <ScrollView>
                  {presetItems[x].items.map((j, k) => {
                    return (
                      <SingleItem
                        isChecked={j === currentSelectedOption}
                        key={k}
                        name={j}
                        onPress={() => {
                          setCurrentSelectedOption(j);
                        }}
                      />
                    );
                  })}
                </ScrollView>
              </View>
              <ButtonContinue onPress={handleNextQuestion} key={i} />
            </React.Fragment>
          )
        );
      })}
    </View>
  );
};

export default WizardItemsDesc;
