import currency from 'currency.js';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {IItem} from '../screens/NewBudget';
import TextBigQuestion from './TextBigQuestion';
import TextInputQuestion from './TextInputQuestion';

const WizardWorkPrice = ({
  currentSelectedItems,
  setItems,
  nextWizard,
}: {
  currentSelectedItems: IItem[];
  setItems(s: IItem[]): void;
  nextWizard(): void;
}) => {
  const [hasWorkPrice, setHasWorkPrice] = useState(false);
  const [currentPriceText, setCurrentPriceText] = useState('');

  const getCurrentFullPrice = () => {
    return currentSelectedItems.reduce((acc, item) => {
      return item.qty * item.value + acc;
    }, 0);
  };

  const handleNextQuestion = () => {
    const itemWithNewValue: IItem = {
      id: Math.round(Math.random() * 2 ** 32),
      name: 'Mão de obra',
      qty: 1,
      value: Number(currentPriceText),
      description: 'Mão de obra',
    };

    setItems(
      [...currentSelectedItems, itemWithNewValue].sort((a, b) => a.id - b.id),
    );

    setTimeout(() => {
      setCurrentPriceText('');
      nextWizard();
    }, 150);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!hasWorkPrice && (
        <>
          <TextBigQuestion>Deseja inserir m&atilde;o de obra?</TextBigQuestion>
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
                setHasWorkPrice(true);
              }}>
              <Text style={{fontSize: 18}}>Sim</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {hasWorkPrice && (
        <>
          <TextBigQuestion>Qual &eacute; o valor?</TextBigQuestion>
          <View style={{padding: 10, width: '33%'}}>
            <TextInputQuestion
              autoFocus
              keyboardType="number-pad"
              onChangeText={_ => setCurrentPriceText(_)}
              onEndEditing={() => handleNextQuestion()}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, color: '#8a8208'}}>
              Total do or&ccedil;amento: R$
              {` ${currency(getCurrentFullPrice() + Number(currentPriceText))}`}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default WizardWorkPrice;
