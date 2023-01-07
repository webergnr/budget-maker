import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const optionsPDF = {
  html: '<h1>PDF TEST</h1>',
  fileName: 'test',
  directory: 'Documents',
  base64: true,
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const BudgetItem = ({t}) => {
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
      }}>
      <View>
        <Text style={{fontSize: 18}}>Fulano de tal</Text>
        <Text style={{fontSize: 18, color: 'gray'}}>{t}</Text>
      </View>
      <Text style={{fontSize: 18, color: 'gray'}}>12/12/2021</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation}: Props) => {
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
        <View style={{}}>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: '#00aa00',
              borderRadius: 999,
            }}
            onPress={async () => {
              let file = await RNHTMLtoPDF.convert(optionsPDF);
              console.log(file.base64);
              if (file.base64) {
                const base64Data = 'data:application/pdf;base64,' + file.base64;
                const x = await Share.open({
                  url: base64Data,
                  title: 'megatest.pdf',
                });

                // const x = await Share.share({
                //   title: '123',
                //   url: base64Data,
                //   message: base64Data,
                // });

                console.log('### =>', x);
              }
              // alert(file.filePath)
            }}>
            <Text style={{color: 'white', paddingHorizontal: 8, fontSize: 20}}>
              PDF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: '#00aa00',
              borderRadius: 999,
            }}
            onPress={() => {
              // navigation.navigate('NewBudget');
            }}>
            <Text style={{color: 'white', paddingHorizontal: 8, fontSize: 20}}>
              CRIAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{backgroundColor: '#f1f1f1', padding: 10}}>
          <BudgetItem t="Assistencia" />
          <BudgetItem t="Poco" />
          <BudgetItem t="Poco" />
          <BudgetItem t="Poco" />
          <BudgetItem t="Poco" />
          <BudgetItem t="Poco" />
          <BudgetItem t="Poco" />
          <BudgetItem t="Poco" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
