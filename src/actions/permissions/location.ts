import { Platform } from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  type PermissionStatus as RNPermissionStatus,
  request,
} from 'react-native-permissions';

import type { PermissionStatus } from '@/infraestructure/interfaces/permissions';

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
  let status: RNPermissionStatus = 'unavailable';

  if (Platform.OS === 'ios') {
    status = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
  } else if (Platform.OS === 'android') {
    status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  } else {
    throw new Error('Unsupported platform');
  }

  if (status === 'blocked') {
    await openSettings();
    return await checkLocationPermission();
  }

  const permissionMaper: Record<RNPermissionStatus, PermissionStatus> = {
    granted: 'granted',
    denied: 'denied',
    blocked: 'blocked',
    limited: 'limited',
    unavailable: 'unavailable',
  };

  return permissionMaper[status] ?? 'unavailable';
};

export const checkLocationPermission = async (): Promise<PermissionStatus> => {
  let status: RNPermissionStatus = 'unavailable';

  if (Platform.OS === 'ios') {
    status = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
  } else if (Platform.OS === 'android') {
    status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  } else {
    throw new Error('Unsupported platform');
  }

  const permissionMaper: Record<RNPermissionStatus, PermissionStatus> = {
    granted: 'granted',
    denied: 'denied',
    blocked: 'blocked',
    limited: 'limited',
    unavailable: 'unavailable',
  };

  return permissionMaper[status] ?? 'unavailable';
};
