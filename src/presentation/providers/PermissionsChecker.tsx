import React, { FC, PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { usePermissionStore } from '../store/permissions/usePermissionStore';
import { RootStackParams } from '../navigation/StackNavigator';

export const PermissionsChecker: FC<PropsWithChildren> = ({ children }) => {
  const { checkLocationPermission, locationStatus } = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (locationStatus === 'granted') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MapsScreen' }],
      });
    } else if (locationStatus !== 'undetermined') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'PermissionsScreen' }],
      });
    }
  }, [locationStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkLocationPermission();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};
