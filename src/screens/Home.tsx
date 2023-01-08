import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

import {getBudgets, removeBudget} from '../utils/storageBudget';
import {IBudget} from './NewBudget';
import {dateToString} from '../utils/date';
import {useFocusEffect} from '@react-navigation/native';
import {generateSharePdf} from '../utils/pdfShare';
import {makeBudgetHTML} from '../utils/budgetHTML';
import {shareIcon64} from '../imgs/share';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

interface IBudgetItemProps {
  budget: IBudget;
  onNavigateEdit: () => void;
  onShowModalDelete: () => void;
}

const BudgetItem = (props: IBudgetItemProps) => {
  const handleSharePdf = async () => {
    const pdfHtml = makeBudgetHTML(props.budget);
    const name = `orcamento-${props.budget.name}`.toLocaleLowerCase();
    await generateSharePdf(pdfHtml, name);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        height: 64,
        marginTop: 8,
        marginBottom: 8,
        borderWidth: 2,
        backgroundColor: '#e8e8e8',
        borderColor: 'gray',
        borderRadius: 10,
      }}
      onPress={props.onNavigateEdit}
      onLongPress={props.onShowModalDelete}
      delayLongPress={2000}>
      <View style={{width: 140}}>
        <Text style={{fontSize: 18}}>{props.budget.name}</Text>
        <Text style={{fontSize: 18, color: 'gray'}}>{props.budget.place}</Text>
      </View>
      <Text style={{fontSize: 14, color: 'gray'}}>
        {dateToString(props.budget.date)}
      </Text>
      <View>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 42,
            width: 42,

            backgroundColor: '#00aa00',
            borderRadius: 9999,
          }}
          onPress={handleSharePdf}>
          <Image source={{uri: shareIcon64, width: 32, height: 32}} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation}: Props) => {
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [modalDelete, setModalDelete] = useState<boolean>(false);

  const handleRemoveItem = async () => {
    await removeBudget({id: deleteId} as IBudget);
    setModalDelete(false);
    setBudgets(await getBudgets());
  };

  const handleDisplayDeleteModal = (b: IBudget) => {
    setDeleteId(b.id);
    setModalDelete(true);
  };

  useFocusEffect(() => {
    (async () => {
      setBudgets(await getBudgets());
    })();
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          height: 80,
          width: '100%',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: 'gray',
          borderStyle: 'solid',
          borderBottomWidth: 2,
        }}>
        <Text style={{color: '#2f2f2f', fontSize: 32, fontWeight: 'bold'}}>
          ORCAMENTOS
        </Text>
        <View>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: '#00aa00',
              borderRadius: 999,
            }}
            onPress={() => {
              navigation.navigate('NewBudget');
            }}>
            <Text style={{color: 'white', paddingHorizontal: 8, fontSize: 20}}>
              CRIAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{backgroundColor: '#f1f1f1', padding: 10}}>
          {budgets
            .sort((a, b) => b.date.valueOf() - a.date.valueOf())
            .map(b => (
              <BudgetItem
                key={b.id}
                onShowModalDelete={() => handleDisplayDeleteModal(b)}
                onNavigateEdit={() =>
                  navigation.navigate('EditBudget', {
                    budget: b,
                  })
                }
                budget={b}
              />
            ))}
        </ScrollView>
      </SafeAreaView>

      {modalDelete && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            backgroundColor: 'rgba(49, 49, 49, 0.81)',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#f1f1f1',
              padding: 10,
              borderRadius: 8,
              width: '90%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 8,
                marginTop: 14,
              }}>
              <Text style={{fontSize: 18}}>
                Deseja realmente excluir o item?
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50%',
                  padding: 10,
                  backgroundColor: '#88aa88',
                  borderRadius: 8,
                }}
                onPress={() => setModalDelete(false)}>
                <Text style={{fontSize: 18}}>NÃO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50%',
                  padding: 10,
                  backgroundColor: '#ff8888',
                  borderRadius: 8,
                }}
                onPress={handleRemoveItem}>
                <Text style={{fontSize: 18}}>SIM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
