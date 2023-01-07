import currency from 'currency.js';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IBudget, IItem} from '../screens/NewBudget';
import FormInput from './FormInput';
import TextBigQuestion from './TextBigQuestion';
import TextInputQuestion from './TextInputQuestion';

const ItemListView = ({
  item,
  onTouchItem,
  onLongPress,
}: {
  item: IItem;
  onTouchItem(): void;
  onLongPress(): void;
}) => {
  return (
    <TouchableOpacity
      onPress={onTouchItem}
      onLongPress={onLongPress}
      delayLongPress={2000}
      style={{
        backgroundColor: '#dfdff9',
        borderRadius: 8,
        padding: 4,
        marginTop: 6,
      }}>
      <Text style={{textTransform: 'uppercase', fontSize: 9}}>{item.name}</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, marginTop: 3}}>{item.description}</Text>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Text style={{fontSize: 12}}>
            {item.qty} x {`R$ ${currency(item.value)}`}
          </Text>
          <Text style={{fontSize: 16}}>{`${currency(
            item.value * item.qty,
          )}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const WizardReview = ({
  setBudget,
  currentBudget,
}: {
  setBudget(budget: IBudget): void;
  currentBudget: IBudget;
}) => {
  const [modalEditing, setModalEditing] = useState(false);
  const [modalItemNew, setModalItemNew] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [deleteId, setDeleteId] = useState(0);

  const [localBudget, setLocalBudget] = useState<IBudget>(currentBudget);

  const [itemNew, setItemNew] = useState<IItem>({} as IItem);

  const [itemEditing, setItemEditing] = useState<IItem>({
    id: 0,
    name: 'ASDASDASD',
    qty: 100,
    value: 20,
    description: 'ASDASDAS',
  });

  // temp editor for the values when editing.
  // first one is qty, other is value
  const [handleTempNumbers, setHandleTempNumbers] = useState<[string, string]>([
    '0',
    '0',
  ]);

  const handleTouchItem = (item: IItem) => {
    console.log('### =>', item);
    setItemEditing(item);
    setModalEditing(true);
    setHandleTempNumbers([String(item.qty), String(item.value)]);
  };

  const handleChangeLocalItem = (newItem: IItem) => {
    const allButEdited = localBudget.items.filter(
      item => item.id !== newItem.id,
    );
    const newList = [...allButEdited, newItem];
    setLocalBudget(prev => ({...prev, items: newList}));
  };

  const handleCreateNewItem = (item: IItem) => {
    const newItem = {...item, id: Math.round(Math.random() * 2 ** 32)};
    setLocalBudget(p => ({...p, items: [...p.items, newItem]}));
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <View style={{padding: 10, width: '100%', flex: 1}}>
        <ScrollView>
          <TextBigQuestion>Revise o or&ccedil;amento</TextBigQuestion>
          <FormInput fieldName="Nome do cliente" value={localBudget.name} />
          <FormInput fieldName="Telefone" value={localBudget.phone} />
          <FormInput
            fieldName="Localiza&ccedil;&atilde;o"
            value={localBudget.place}
          />
          <FormInput
            fieldName="Metros do po&ccedil;o"
            value={localBudget.size}
          />
          <FormInput
            fieldName="Condi&ccedil;&otilde;es de pagamento"
            value={localBudget.payment}
          />
          <View
            style={{
              marginTop: 10,
              flex: 1,
              width: '100%',
              padding: 9,
              borderStyle: 'solid',
              borderColor: '#2f2f2f',
              borderWidth: 2,
              borderRadius: 8,
            }}>
            {localBudget.items
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(item => (
                <ItemListView
                  onLongPress={() => console.log('123')}
                  key={item.id}
                  item={item}
                  onTouchItem={() => {
                    handleTouchItem(item);
                  }}
                />
              ))}
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginBottom: 5,
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: '#88aa88',
            borderRadius: 8,
          }}
          onPress={() => {
            setModalItemNew(true);
            setHandleTempNumbers(['0', '0']);
            setItemNew({
              id: 0,
              name: '',
              qty: 0,
              value: 0,
              description: '',
            });
          }}>
          <Text style={{fontSize: 18}}>ADICIONAR ITEM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: '#c2c2f9',
            borderRadius: 8,
          }}
          onPress={() => {}}>
          <Text style={{fontSize: 18}}>FINALIZAR</Text>
        </TouchableOpacity>
      </View>

      {modalEditing && (
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
            <FormInput
              fieldName="Descrição"
              value={itemEditing.description}
              onChangeText={_ =>
                setItemEditing({...itemEditing, description: _})
              }
            />
            <View style={{flexDirection: 'row', marginTop: 9}}>
              <View style={{flex: 1, paddingHorizontal: 9}}>
                <Text>Quantidade</Text>
                <TextInputQuestion
                  keyboardType="number-pad"
                  value={String(handleTempNumbers[0])}
                  onChangeText={_ => {
                    setHandleTempNumbers(v => {
                      const [, r] = v;
                      return [_, r];
                    });
                  }}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 9}}>
                <Text>Valor</Text>
                <TextInputQuestion
                  keyboardType="number-pad"
                  value={String(handleTempNumbers[1])}
                  onChangeText={_ => {
                    setHandleTempNumbers(v => {
                      const [r] = v;
                      return [r, _];
                    });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                // backgroundColor: 'red',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                paddingHorizontal: 8,
                marginTop: 14,
              }}>
              <View
                style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Text style={{fontSize: 12}}>
                  {handleTempNumbers[0]} x{' '}
                  {`R$ ${currency(Number(handleTempNumbers[1]))}`}
                </Text>
                <Text style={{fontSize: 16}}>{`${currency(
                  Number(handleTempNumbers[1]) * Number(handleTempNumbers[0]),
                )}`}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: 10,
                  backgroundColor: '#88aa88',
                  borderRadius: 8,
                }}
                onPress={() => {
                  handleChangeLocalItem({
                    ...itemEditing,
                    qty: Number(handleTempNumbers[0]),
                    value: Number(handleTempNumbers[1]),
                  });
                  setModalEditing(false);
                }}>
                <Text style={{fontSize: 18}}>SALVAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {modalItemNew && (
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
            <FormInput
              fieldName="Tipo"
              value={itemNew.name}
              onChangeText={_ => setItemNew({...itemNew, name: _})}
            />
            <FormInput
              fieldName="Descrição"
              value={itemNew.description}
              onChangeText={_ => setItemNew({...itemNew, description: _})}
            />
            <View style={{flexDirection: 'row', marginTop: 9}}>
              <View style={{flex: 1, paddingHorizontal: 9}}>
                <Text>Quantidade</Text>
                <TextInputQuestion
                  keyboardType="number-pad"
                  value={String(handleTempNumbers[0])}
                  onChangeText={_ => {
                    setHandleTempNumbers(v => {
                      const [, r] = v;
                      return [_, r];
                    });
                  }}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 9}}>
                <Text>Valor</Text>
                <TextInputQuestion
                  keyboardType="number-pad"
                  value={String(handleTempNumbers[1])}
                  onChangeText={_ => {
                    setHandleTempNumbers(v => {
                      const [r] = v;
                      return [r, _];
                    });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                // backgroundColor: 'red',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                paddingHorizontal: 8,
                marginTop: 14,
              }}>
              <View
                style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <Text style={{fontSize: 12}}>
                  {handleTempNumbers[0]} x{' '}
                  {`R$ ${currency(Number(handleTempNumbers[1]))}`}
                </Text>
                <Text style={{fontSize: 16}}>{`${currency(
                  Number(handleTempNumbers[1]) * Number(handleTempNumbers[0]),
                )}`}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: 10,
                  backgroundColor: '#88aa88',
                  borderRadius: 8,
                }}
                onPress={() => {
                  handleCreateNewItem({
                    ...itemNew,
                    qty: Number(handleTempNumbers[0]),
                    value: Number(handleTempNumbers[1]),
                  });
                  setModalItemNew(false);
                }}>
                <Text style={{fontSize: 18}}>SALVAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {modalDelete && null}
    </View>
  );
};

export default WizardReview;
