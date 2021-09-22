import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const SingleItem = ({name, isChecked, ...rest}: any) => {
  return (
    <TouchableOpacity
      {...rest}
      style={{
        height: 50,
        width: 330,
        backgroundColor: '#ddd',
        borderRadius: 8,
        marginTop: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#888',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text style={{fontSize: 18}}>{name}</Text>
      {isChecked && <Text style={{fontSize: 22}}>✅</Text>}
    </TouchableOpacity>
  );
};

export default SingleItem;
