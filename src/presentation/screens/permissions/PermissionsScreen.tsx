import React, { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { usePermissionStore } from '@/presentation/store/permissions/usePermissionStore';
import { globalStyles } from '@/config/theme/globalStyles';

interface Props {}

export const PermissionsScreen: FC<Props> = () => {
  const { locationStatus, requestLocationPermission } = usePermissionStore();

  return (
    <View style={styles.container}>
      <Text>Habilitar ubicación</Text>
      <Pressable
        style={({ pressed }) => [
          globalStyles.btnPrimary,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={requestLocationPermission}>
        <Text style={globalStyles.btnPrimaryText}>Habilitar Localización</Text>
      </Pressable>

      <Text>Estado actual: {locationStatus}</Text>
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
