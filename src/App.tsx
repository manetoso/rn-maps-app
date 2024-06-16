import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from '@/presentation/navigation/StackNavigator';

export const App: FC = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
