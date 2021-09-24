/* eslint-disable no-lone-blocks */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import WizardItemsDesc from '../components/WizardItemsDesc';
import WizardName from '../components/WizardName';
import WizardPhone from '../components/WizardPhone';
import WizardPlace from '../components/WizardPlace';
import WizardPresets from '../components/WizardPresets';
import WizardQtys from '../components/WizardQtys';

export interface IItem {
  description?: string;
  value: number;
  name: string;
  qty: number;
  qtyType: string;
}

const NewBudget: React.FC = () => {
  const [wizardIndex, setWizardIndex] = useState<number>(0);

  const [infoName, setInfoName] = useState<string>('');
  const [infoPlace, setInfoPlace] = useState<string>('');
  const [infoPhone, setInfoPhone] = useState<string>('');
  const [presets, setPresets] = useState<string[]>([]);
  const [items, setItems] = useState<IItem[]>([]);

  switch (wizardIndex) {
    case 0: {
      return (
        <WizardName
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          setName={setInfoName}
        />
      );
      break;
    }
    case 1: {
      return (
        <WizardPlace
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          setPlace={setInfoPlace}
        />
      );
      break;
    }
    case 2: {
      return (
        <WizardPhone
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          setPhone={setInfoPhone}
        />
      );
      break;
    }
    case 3: {
      return (
        <WizardPresets
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          setPresets={setPresets}
        />
      );
      break;
    }
    case 4: {
      return (
        <WizardItemsDesc
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          setItemsDesc={setItems}
          selectedItems={presets}
        />
      );
      break;
    }
    case 5: {
      return (
        <WizardQtys
          currentSelectedItems={items}
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          setItems={setItems}
        />
      );
      break;
    }

    default:
      return (
        <View>
          <Text>{infoName}</Text>
          <Text>{infoPlace}</Text>
          <Text>{infoPhone}</Text>
          <Text>{presets}</Text>
        </View>
      );
      break;
  }
};

export default NewBudget;
