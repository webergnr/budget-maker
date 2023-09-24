import React, {useState} from 'react';
import {View} from 'react-native';
import {presetItems} from '../constants';
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
  const [currentQtyText, setCurrentQtyText] = useState('');

  const handleNextQuestion = (item: IItem) => {
    const itemWithNewValue: IItem = {
      id: item.id,
      name: item.name,
      qty: Number(currentQtyText),
      value: 0,
      description: item.description,
    };

    const allButOne = currentSelectedItems.filter(x => x.id !== item.id);

    setItems([...allButOne, itemWithNewValue].sort((a, b) => a.id - b.id));

    setTimeout(() => {
      setCurrentQtyText('');
      if (currentQuestion !== currentSelectedItems.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        nextWizard();
      }
    }, 150);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {currentSelectedItems
        .sort((a, b) => a.id - b.id)
        .map((x, i) => {
          return (
            i === currentQuestion && (
              <React.Fragment key={x.id}>
                <TextBigQuestion>
                  {presetItems[x.name].questionType}
                </TextBigQuestion>
                <View style={{padding: 10, width: '33%'}}>
                  <TextInputQuestion
                    autoFocus
                    keyboardType="number-pad"
                    value={currentQtyText}
                    onChangeText={_ => setCurrentQtyText(_)}
                    onEndEditing={() => handleNextQuestion(x)}
                  />
                </View>
              </React.Fragment>
            )
          );
        })}
    </View>
  );
};

export default WizardQtys;
