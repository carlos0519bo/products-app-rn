import React from 'react';
import { View } from 'react-native';

export const Background = () => {
  return (
    <View
      style={{
        width: 1000,
        height: 1200,
        top: -250,
        position: 'absolute',
        backgroundColor: '#5856D6',
        transform: [
            {rotate: '-70deg'}
        ]
      }}
    />
  );
};
