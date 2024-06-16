import { create } from 'zustand';

import {
  clearWatchLocation,
  getCurrentLocation,
  watchCurrentLocation,
} from '@/actions/location/Location';

import type { Location } from '@/infraestructure/interfaces/location';

export interface LocationState {
  lastKnownLocation: Location | null;
  userLocationsHistory: Location[];
  watchId: number | null;
  getLocation(): Promise<Location | null>;
  watchLocation(): void;
  clearWatchLocation(): void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationsHistory: [],
  watchId: null,
  getLocation: async () => {
    const location = await getCurrentLocation();
    set({ lastKnownLocation: location });
    return location;
  },
  watchLocation: () => {
    const watchId = get().watchId;
    if (watchId !== null) {
      get().clearWatchLocation();
    }
    const newWatchId = watchCurrentLocation(location => {
      set(state => ({
        lastKnownLocation: location,
        userLocationsHistory: [...state.userLocationsHistory, location],
      }));
    });

    set({ watchId: newWatchId });
  },
  clearWatchLocation: () => {
    const watchId = get().watchId;
    if (watchId !== null) {
      clearWatchLocation(watchId);
    }
  },
}));
