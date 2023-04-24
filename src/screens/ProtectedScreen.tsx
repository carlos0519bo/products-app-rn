import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {
  const { user, token, logOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected Screen</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={logOut}
      >
        <Text>Cerra sesión</Text>
      </TouchableOpacity>

      <Text>{JSON.stringify(user, null, 5)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    width: 120,
    height: 40,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
