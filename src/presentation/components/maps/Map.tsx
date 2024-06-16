import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import { useLocationStore } from '@/presentation/store/location/useLocationStore';
import { FAB } from '../ui/FAB';

import type { Location } from '@/infraestructure/interfaces/location';

interface Props {
  initialLocation: Location;
  markers?: { latitude: number; longitude: number; title: string; description: string }[];
  showsUserLocation?: boolean;
}

export const Map: FC<Props> = ({ initialLocation, markers, showsUserLocation = true }) => {
  const mapRef = useRef<MapView>();
  const camaraLocation = useRef<Location>(initialLocation);
  const [isFollowinfUser, setIsFollowinfUser] = useState(true);
  const [isShowingPolyline, setIsShowingPolyline] = useState(true);
  const {
    getLocation,
    lastKnownLocation,
    clearWatchLocation,
    watchLocation,
    userLocationsHistory,
  } = useLocationStore();

  const moveCameraToLocation = (location: Location) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({ center: location });
  };

  const moveToCurrentLocation = async () => {
    if (lastKnownLocation) {
      moveCameraToLocation(lastKnownLocation);
    }
    const location = await getLocation();
    if (!location) return;
    moveCameraToLocation(location);
  };

  useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (lastKnownLocation && isFollowinfUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowinfUser]);

  return (
    <>
      <MapView
        ref={map => (mapRef.current = map!)}
        showsUserLocation={showsUserLocation}
        onTouchStart={() => setIsFollowinfUser(false)}
        // remove if not using Google Maps
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: camaraLocation.current.latitude,
          longitude: camaraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            // image={require('@/assets/custom-marker.png')}
          />
        ))}
        {isShowingPolyline && (
          <Polyline coordinates={userLocationsHistory} strokeWidth={3} strokeColor="red" />
        )}
      </MapView>
      <FAB
        iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
        onPress={() => setIsShowingPolyline(!isShowingPolyline)}
        style={styles.polyline}
      />
      <FAB
        iconName={isFollowinfUser ? 'walk-outline' : 'accessibility-outline'}
        onPress={() => setIsFollowinfUser(!isFollowinfUser)}
        style={styles.following}
      />
      <FAB iconName="compass-outline" onPress={moveToCurrentLocation} style={styles.compass} />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  compass: {
    bottom: 20,
    right: 20,
  },
  following: {
    bottom: 80,
    right: 20,
  },
  polyline: {
    bottom: 140,
    right: 20,
  },
});
