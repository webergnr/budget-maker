import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

const TextInputQuestion: React.FC<TextInputProps> = ({...props}) => {
  return (
    <TextInput
      {...props}
      style={{
        fontSize: 18,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        padding: 2,
        width: '100%',
      }}
    />
  );
};

export default TextInputQuestion;
