import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {presetItems} from '../constants';
import currency from 'currency.js';
import {IItem} from '../screens/NewBudget';
import TextBigQuestion from './TextBigQuestion';
import TextInputQuestion from './TextInputQuestion';

const WizardPrice = ({
  currentSelectedItems,
  setItems,
  nextWizard,
}: {
  currentSelectedItems: IItem[];
  setItems(s: IItem[]): void;
  nextWizard(): void;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentBudgetValue, setCurrentBudgetValue] = useState(0);
  const [currentPriceText, setCurrentPriceText] = useState('');

  const handleNextQuestion = (item: IItem) => {
    const itemWithNewValue: IItem = {
      id: item.id,
      name: item.name,
      qty: item.qty,
      value: Number(currentPriceText),
      description: item.description,
    };

    const allButOne = currentSelectedItems.filter(x => x.id !== item.id);

    setItems([...allButOne, itemWithNewValue].sort((a, b) => a.id - b.id));

    setTimeout(() => {
      setCurrentPriceText('');
      setCurrentBudgetValue(
        currentBudgetValue + Number(currentPriceText) * item.qty,
      );
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
                  Pre&ccedil;o por {presetItems[x.name].qtyType} de {x.name}
                </TextBigQuestion>
                <View style={{padding: 10, width: '33%'}}>
                  <TextInputQuestion
                    keyboardType="number-pad"
                    value={currentPriceText}
                    onChangeText={_ => setCurrentPriceText(_)}
                    onEndEditing={() => handleNextQuestion(x)}
                  />
                </View>
                <View style={{marginTop: 100}}>
                  <Text style={{fontSize: 18}}>{`${x.qty} ${
                    presetItems[x.name].qtyType
                  } x R$ ${currency(currentPriceText)} =  R$ ${currency(
                    Number(currentPriceText) * x.qty,
                  )}`}</Text>
                </View>
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 18, color: '#8a8208'}}>
                    Total do or&ccedil;amento: R$
                    {` ${currency(
                      currentBudgetValue + Number(currentPriceText) * x.qty,
                    )}`}
                  </Text>
                </View>
              </React.Fragment>
            )
          );
        })}
    </View>
  );
};

export default WizardPrice;
