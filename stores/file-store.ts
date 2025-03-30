import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FileItem, Category } from '@/types/files';
import { mockFiles, mockCategories } from '@/mocks/files';

interface FileState {
  files: FileItem[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  selectedFile: FileItem | null;
  
  // Actions
  setFiles: (files: FileItem[]) => void;
  addFile: (file: FileItem) => void;
  updateFile: (id: string, updates: Partial<FileItem>) => void;
  deleteFile: (id: string) => void;
  toggleStarred: (id: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedFile: (file: FileItem | null) => void;
  getFilesByCategory: (category: string) => FileItem[];
  getFileById: (id: string) => FileItem | undefined;
}

export const useFileStore = create<FileState>()(
  persist(
    (set, get) => ({
      files: mockFiles,
      categories: mockCategories,
      selectedCategory: 'All',
      searchQuery: '',
      selectedFile: null,
      
      setFiles: (files) => set({ files }),
      
      addFile: (file) => set((state) => ({ 
        files: [...state.files, file] 
      })),
      
      updateFile: (id, updates) => set((state) => ({
        files: state.files.map(file => 
          file.id === id ? { ...file, ...updates } : file
        )
      })),
      
      deleteFile: (id) => set((state) => ({
        files: state.files.filter(file => file.id !== id),
        selectedFile: state.selectedFile?.id === id ? null : state.selectedFile
      })),
      
      toggleStarred: (id) => set((state) => ({
        files: state.files.map(file => 
          file.id === id ? { ...file, starred: !file.starred } : file
        )
      })),
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSelectedFile: (file) => set({ selectedFile: file }),
      
      getFilesByCategory: (category) => {
        const { files } = get();
        
        switch(category) {
          case 'All':
            return files;
          case 'Starred':
            return files.filter(file => file.starred);
          case 'photos':
            return files.filter(file => file.type === 'image');
          case 'videos':
            return files.filter(file => file.type === 'video');
          case 'music':
            return files.filter(file => file.type === 'audio');
          case 'documents':
            return files.filter(file => file.type === 'document');
          case 'downloads':
            return files.filter(file => file.category === 'Downloads');
          case 'apk':
            return files.filter(file => file.name.toLowerCase().endsWith('.apk'));
          default:
            return files.filter(file => file.category === category);
        }
      },
      
      getFileById: (id) => {
        return get().files.find(file => file.id === id);
      },
    }),
    {
      name: 'file-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);