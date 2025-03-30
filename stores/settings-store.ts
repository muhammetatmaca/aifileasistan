import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  showFileSize: boolean;
  showFileDate: boolean;
  showFilePath: boolean;
  sortBy: 'name' | 'date' | 'size' | 'type';
  sortDirection: 'asc' | 'desc';
  
  // Actions
  toggleShowFileSize: () => void;
  toggleShowFileDate: () => void;
  toggleShowFilePath: () => void;
  setSortBy: (sortBy: 'name' | 'date' | 'size' | 'type') => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      showFileSize: true,
      showFileDate: true,
      showFilePath: false,
      sortBy: 'date',
      sortDirection: 'desc',
      
      toggleShowFileSize: () => set((state) => ({ 
        showFileSize: !state.showFileSize 
      })),
      
      toggleShowFileDate: () => set((state) => ({ 
        showFileDate: !state.showFileDate 
      })),
      
      toggleShowFilePath: () => set((state) => ({ 
        showFilePath: !state.showFilePath 
      })),
      
      setSortBy: (sortBy) => set({ sortBy }),
      
      setSortDirection: (sortDirection) => set({ sortDirection }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);