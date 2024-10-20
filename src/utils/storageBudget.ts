import AsyncStorage from '@react-native-async-storage/async-storage';
import {IBudget} from '../screens/NewBudget';

const STORAGE_KEY = '@budgets';

type TBudgetDateString = Omit<IBudget, 'date'> & {date: string};

const getBudgets = async () => {
  try {
    const jsonValues = await AsyncStorage.getItem(STORAGE_KEY);
    const budgets =
      jsonValues != null
        ? (JSON.parse(jsonValues) as TBudgetDateString[])
        : ([] as TBudgetDateString[]);

    return budgets.map(b => ({...b, date: new Date(b.date)}));
  } catch (e) {
    console.error(e);
    return [];
  }
};

const addBudget = async (b: IBudget) => {
  try {
    const prev = await getBudgets();
    const jsonValue = JSON.stringify([...prev, b]);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const backupDb = async () => {
  try {
    const jsonValues = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValues;
  } catch (e) {
    console.log(e);
  }
};

const applyBackup = async (backup: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, backup);
  } catch (e) {
    console.log(e);
  }
}

const clearDb = async () => {
  // await await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
};

const removeBudget = async (b: IBudget) => {
  try {
    const prev = await getBudgets();
    const jsonValue = JSON.stringify([...prev.filter(f => f.id !== b.id)]);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export {addBudget, getBudgets, removeBudget, clearDb, backupDb, applyBackup};
