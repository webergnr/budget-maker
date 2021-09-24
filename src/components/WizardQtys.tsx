import React, {useState} from 'react';
import {View} from 'react-native';
import {IItem} from '../screens/NewBudget';
import TextBigQuestion from './TextBigQuestion';
import TextInputQuestion from './TextInputQuestion';

const WizardQtys = ({
  currentSelectedItems,
  setItems,
  nextWizard,
}: {
  currentSelectedItems: IItem[];
  setItems(s: IItem[]): void;
  nextWizard(): void;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextQuestion = (itemName: string) => {
    // TODO: filter by itemName and setItems with new value
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {currentSelectedItems.map((x, i) => {
        return (
          i === currentQuestion && (
            <>
              <TextBigQuestion>
                {x.name} {x.qtyType}
              </TextBigQuestion>
              <View style={{padding: 10, width: '100%'}}>
                <TextInputQuestion
                  onChangeText={_ => console.log(_)}
                  onEndEditing={() => handleNextQuestion(x.name)}
                />
              </View>
            </>
          )
        );
      })}
    </View>
  );
};

export default WizardQtys;
