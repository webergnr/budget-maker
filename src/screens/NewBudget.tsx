/* eslint-disable no-lone-blocks */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import WizardName from '../components/WizardName';
import WizardPhone from '../components/WizardPhone';
import WizardPlace from '../components/WizardPlace';
import WizardPresets from '../components/WizardPresets';

interface IItem {
  description?: string;
  value: number;
  name: string;
  viewed: boolean;
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
      return <WizardPresets />;
      break;
    }

    default:
      return <Text>test</Text>;
      break;
  }
};

export default NewBudget;
