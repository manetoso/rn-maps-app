import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SOME_API_KEY } from '@env';

interface Props {}

export const LoadingScreen: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>LoadingScreen</Text>
      <Text>ENV variable: {SOME_API_KEY}</Text>
      <Ionicons name="accessibility" size={30} color="black" />
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
