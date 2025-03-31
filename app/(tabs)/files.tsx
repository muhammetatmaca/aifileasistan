import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView,
  Alert,
  Modal,
  Text,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFileStore } from '@/stores/file-store';
import Colors from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import StorageInfo from '@/components/StorageInfo';
import JunkCleanerButton from '@/components/JunkCleanerButton';
import CategoryGrid from '@/components/CategoryGrid';
import RecentFiles from '@/components/RecentFiles';
import SearchBar from '@/components/SearchBar';
import { X } from 'lucide-react-native';
import { Category } from '@/types/files';

export default function FilesScreen() {
  const router = useRouter();
  const { files, setSelectedFile, setSelectedCategory } = useFileStore();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef(null);
  
  // Sort files by last modified date (newest first)
  const recentFiles = [...files].sort((a, b) => 
    new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );
  type FileType = {
    id: string;
    name: string;
    type: string;
    size: number;
    lastModified: number;
    thumbnail?: string;
    path: string; // Path ekleniyor
  };
  
  
  const handleFilePress = (file: FileType) => {
    setSelectedFile(file);
    router.push('/file-details');
  };
  
  
  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category.id); // Pass only the id
    router.push('/(tabs)/categories');
  };
  
  
  
  const handleJunkCleanerPress = () => {
    Alert.alert(
      "Junk Cleaner",
      "This would scan your device for junk files to clean.",
      [{ text: "OK" }]
    );
  };
  
  const handleSearchPress = () => {
    setSearchVisible(true);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would filter files based on the query
  };
  
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <AppHeader 
        title="ESX" 
        onSearchPress={handleSearchPress}
        onMenuPress={() => router.push('/settings')}
      />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <StorageInfo used={8.76} total={53.65} />
        
        <JunkCleanerButton onPress={handleJunkCleanerPress} />
        
        
      </ScrollView>
      
      <Modal
        visible={searchVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSearchVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.searchHeader}>
            <SearchBar
              value={searchQuery}
              onChangeText={handleSearch}
              onClear={() => setSearchQuery('')}
              placeholder="Search files..."
            />
            <Pressable 
              style={styles.closeButton}
              onPress={() => setSearchVisible(false)}
            >
              <X size={24} color={Colors.light.text} />
            </Pressable>
          </View>
          
          <View style={styles.searchResults}>
            {searchQuery ? (
              <Text style={styles.searchInfo}>
                Searching for "{searchQuery}"...
              </Text>
            ) : (
              <Text style={styles.searchInfo}>
                Type to search for files
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.light.card,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
  searchResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  searchInfo: {
    fontSize: 16,
    color: Colors.light.secondaryText,
    textAlign: 'center',
  },
});