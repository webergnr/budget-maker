import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const GIST_ID = '<gist>';
const GH_TOKEN =
  '<gh_token>';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

import {useFocusEffect} from '@react-navigation/native';
import {shareIcon64} from '../imgs/share';
import {makeBudgetHTML} from '../utils/budgetHTML';
import {dateToString} from '../utils/date';
import {generateSharePdf} from '../utils/pdfShare';
import {
  applyFromBackup,
  backupDb,
  getBudgets,
  removeBudget,
} from '../utils/storageBudget';
import {IBudget} from './NewBudget';
import {Alert} from 'react-native';

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
  const [modalOptions, setModalOptions] = useState<boolean>(false);

  const handleRemoveItem = async () => {
    await removeBudget({id: deleteId} as IBudget);
    setModalDelete(false);
    setBudgets(await getBudgets());
  };
  const handleBkpDataImport = async () => {
    const url = `https://api.github.com/gists/${GIST_ID}`;

    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GH_TOKEN}`,
      },
    });

    const rawData = await req.json();
    const content = rawData?.files?.['jw-data.json']?.content;
    if (content) {
      console.log('###', content);
      applyFromBackup(content);
      Alert.alert('Dados importados com sucesso!');
    }

    // ;
  };

  const handleBkpData = async () => {
    const data = await backupDb();
    const dt = new Date();

    const updateCurrentBkp = async () => {
      const url = `https://api.github.com/gists/${GIST_ID}`;

      await fetch(url, {
        method: 'PATCH',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GH_TOKEN}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          description: `${dt.toISOString()}`,
          public: false,
          files: {['jw-data.json']: {content: data}},
        }),
      });
    };

    const addNewBkp = async () => {
      const url = 'https://api.github.com/gists';

      await fetch(url, {
        method: 'POST',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GH_TOKEN}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          description: `${dt.toISOString()}`,
          public: false,
          files: {[`jw-data-${dt.valueOf()}.json`]: {content: data}},
        }),
      });
    };

    await updateCurrentBkp();
    await addNewBkp();

    Alert.alert('Backup realizado com sucesso!');
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
        <TouchableWithoutFeedback
          onLongPress={() => {
            setModalOptions(true);
          }}>
          <Text style={{color: '#2f2f2f', fontSize: 32, fontWeight: 'bold'}}>
            ORCAMENTOS
          </Text>
        </TouchableWithoutFeedback>
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

      {modalOptions && (
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
              <Text style={{fontSize: 18}}> bkps </Text>
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
                onPress={() => setModalOptions(false)}>
                <Text style={{fontSize: 18}}>Fechar</Text>
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
                onPress={handleBkpData}>
                <Text style={{fontSize: 18}}>Salvar</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50%',
                  padding: 10,
                  backgroundColor: '#8888FF',
                  borderRadius: 8,
                }}
                onPress={handleBkpDataImport}>
                <Text style={{fontSize: 18}}>Importar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
