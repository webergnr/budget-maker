import React from 'react';
import {Text, View, TextInput, TextInputProps} from 'react-native';

interface IFormInput extends TextInputProps {
  fieldName: string;
}

const FormInput: React.FC<IFormInput> = ({fieldName, ...rest}) => {
  return (
    <View
      style={{
        marginTop: 20,
        position: 'relative',
        borderColor: '#2f2f2f',
        borderWidth: 2,
        borderRadius: 8,
      }}>
      <View
        style={{
          position: 'absolute',
          marginLeft: 12,
          marginTop: -12,
          backgroundColor: '#f1f1f1',
          paddingHorizontal: 8,
        }}>
        <Text
          style={{
            fontSize: 14,
          }}>
          {fieldName}
        </Text>
      </View>
      <TextInput
        style={{
          fontSize: 16,
        }}
        {...rest}
      />
    </View>
  );
};

export default FormInput;
