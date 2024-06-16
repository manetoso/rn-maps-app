import 'react-native-gesture-handler';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StackNavigator } from '@/presentation/navigation/StackNavigator';
import { PermissionsChecker } from '@/presentation/providers/PermissionsChecker';

export const App: FC = () => {
  return (
    <NavigationContainer>
      <PermissionsChecker>
        <StackNavigator />
      </PermissionsChecker>
    </NavigationContainer>
  );
};
