/* eslint-disable no-lone-blocks */
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from '../App';
import WizardItemsDesc from '../components/WizardItemsDesc';
import WizardName from '../components/WizardName';
import WizardPhone from '../components/WizardPhone';
import WizardPlace from '../components/WizardPlace';
import WizardPresets from '../components/WizardPresets';
import WizardPrice from '../components/WizardPrice';
import WizardQtys from '../components/WizardQtys';
import WizardReview from '../components/WizardReview';
import WizardSize from '../components/WizardSize';
import WizardWorkPrice from '../components/WizardWorkPrice';
import {addBudget} from '../utils/storageBudget';

export interface IItem {
  id: number;
  description?: string;
  value: number;
  name: string;
  qty: number;
}

export interface IBudget {
  id: number;
  date: Date;
  name: string;
  phone?: string;
  place: string;
  size: string;
  payment: string;
  items: IItem[];
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewBudget'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const NewBudget = ({navigation}: Props) => {
  const [wizardIndex, setWizardIndex] = useState<number>(0);

  const [infoName, setInfoName] = useState<string>('');
  const [infoPlace, setInfoPlace] = useState<string>('');
  const [infoPhone, setInfoPhone] = useState<string>('');
  const [infoSize, setInfoSize] = useState<string>('');
  const [presets, setPresets] = useState<string[]>([]);
  const [items, setItems] = useState<IItem[]>([]);

  const handleSaveBudget = (b: IBudget) => {
    addBudget(b);
    navigation.navigate('Home');
  };

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
    }
    case 5: {
      return (
        <WizardQtys
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          currentSelectedItems={items.sort((a, b) => a.id - b.id)}
          setItems={setItems}
        />
      );
    }
    case 6: {
      return (
        <WizardPrice
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          currentSelectedItems={items.sort((a, b) => a.id - b.id)}
          setItems={setItems}
        />
      );
    }
    case 7: {
      return (
        <WizardWorkPrice
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          currentSelectedItems={items}
          setItems={setItems}
        />
      );
    }
    case 8: {
      return (
        <WizardSize
          nextWizard={() => {
            setWizardIndex(wizardIndex + 1);
          }}
          setSize={setInfoSize}
        />
      );
    }
    case 9: {
      return (
        <WizardReview
          currentBudget={{
            id: new Date().valueOf(),
            date: new Date(),
            name: infoName,
            place: infoPlace,
            size: infoSize,
            phone: infoPhone,
            items,
            payment: 'À vista',
          }}
          setBudget={handleSaveBudget}
        />
      );
    }

    default:
      return (
        <View>
          <Text>{infoName}</Text>
          <Text>{infoPlace}</Text>
          <Text>{infoPhone}</Text>
          <Text>{infoSize}</Text>
          <Text>{JSON.stringify(presets)}</Text>
          <Text>{JSON.stringify(items, null, 2)}</Text>
        </View>
      );
  }
};

export default NewBudget;
