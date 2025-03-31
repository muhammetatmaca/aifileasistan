import React from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Text,
  Pressable,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFileStore } from '@/stores/file-store';
import Colors from '@/constants/colors';
import FileItem from '@/components/FileItem';
import CategoryCard from '@/components/CategoryCard';
import EmptyState from '@/components/EmptyState';
import { ArrowLeft } from 'lucide-react-native';
import { Category } from '@/types/files';
import { FileType } from '@/types/files';
export default function CategoriesScreen() {
  const router = useRouter();
  const { 
    files, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    toggleStarred, 
    getFilesByCategory 
  } = useFileStore();
  
  const filteredFiles = getFilesByCategory(selectedCategory);
  
  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category.id); // sadece id'yi gönder
    router.push('/(tabs)/categories');
  };
  
 
  


  
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={Colors.light.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Pressable 
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/files')}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        
        <Text style={styles.headerTitle}>Categories</Text>
      </LinearGradient>
      
      <View style={styles.content}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <CategoryCard
            category={{
              id: 'all',
              name: 'All',
              icon: 'Folder',
              color: Colors.light.primary,
              count: files.length,
            }}
            isSelected={selectedCategory === 'All'}
            onPress={() => setSelectedCategory('All')}
          />
          
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.name}
              onPress={handleCategoryPress}
            />
          ))}
        </ScrollView>
        
        <View style={styles.filesContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Files' : selectedCategory}
          </Text>
          
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    padding: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 16,
  },
  filesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  filesList: {
    paddingBottom: 16,
  },
});