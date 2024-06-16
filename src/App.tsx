import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SOME_API_KEY } from '@env';

interface Props {}

export const App: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>App</Text>
      <Text>ENV variable: {SOME_API_KEY}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
