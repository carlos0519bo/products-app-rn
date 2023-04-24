import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Producto } from '../interfaces/appInterfaces';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route, navigation }: Props) => {
  const { id, name = '' } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'Nuevo producto',
    });
  }, []);

  return (
    <View>
      <Text>
        {id} - {name}
      </Text>
    </View>
  );
};
