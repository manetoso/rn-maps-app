import Geolocation from '@react-native-community/geolocation';

import type { Location } from '@/infraestructure/interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        resolve({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      error => {
        console.log('Error getting location');
        reject(error);
      },
      {
        enableHighAccuracy: true,
      },
    );
  });
};

export const watchCurrentLocation = (locationCallback: (location: Location) => void): number => {
  return Geolocation.watchPosition(
    info => {
      locationCallback({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    },
    error => {
      console.error(error);
      throw new Error('Error watching location');
    },
    {
      enableHighAccuracy: true,
    },
  );
};

export const clearWatchLocation = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};
