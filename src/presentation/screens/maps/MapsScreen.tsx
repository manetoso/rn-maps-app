import React, { FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { useLocationStore } from '@/presentation/store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';
import { Map } from '@/presentation/components/maps/Map';

interface Props {}

export const MapsScreen: FC<Props> = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (lastKnownLocation === null) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <Map initialLocation={lastKnownLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
