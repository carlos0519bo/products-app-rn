import React from 'react';
import { Image, View } from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={require('../../assets/react-logo-white.png')}
        style={{
          height: 100,
          width: 110,
        }}
      />
    </View>
  );
};
