import React from 'react';
import {Text} from 'react-native';

const TextBigQuestion: React.FC = ({children}) => {
  return <Text style={{fontSize: 24}}>{children}</Text>;
};
export default TextBigQuestion;
