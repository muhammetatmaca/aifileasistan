import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import Colors from '@/constants/colors';
import { Image, FileText, Video, Music, FolderDown, Grid } from 'lucide-react-native';

interface CategoryItemProps {
  name: string;
  icon: React.ReactNode;
  color: string;
  onPress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ name, icon, color, onPress }) => {
  return (
    <Pressable 
      style={styles.categoryItem} 
      onPress={onPress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        {icon}
      </View>
      <Text style={styles.categoryName}>{name}</Text>
    </Pressable>
  );
};

interface CategoryGridProps {
  onCategoryPress: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryPress }) => {
  const categories = [
    { 
      id: 'photos', 
      name: 'Photos', 
      icon: <Image size={24} color="#FFFFFF" />,
      color: '#5B7FFF'
    },
    { 
      id: 'videos', 
      name: 'Videos', 
      icon: <Video size={24} color="#FFFFFF" />,
      color: '#FFC107'
    },
    { 
      id: 'music', 
      name: 'Music', 
      icon: <Music size={24} color="#FFFFFF" />,
      color: '#FF7043'
    },
    { 
      id: 'documents', 
      name: 'Documents', 
      icon: <FileText size={24} color="#FFFFFF" />,
      color: '#26C6DA'
    },
    { 
      id: 'downloads', 
      name: 'Download', 
      icon: <FolderDown size={24} color="#FFFFFF" />,
      color: '#FFCA28'
    },
    { 
      id: 'apk', 
      name: 'APK', 
      icon: <Grid size={24} color="#FFFFFF" />,
      color: '#5B7FFF'
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CategoryItem
            name={item.name}
            icon={item.icon}
            color={item.color}
            onPress={() => onCategoryPress(item.id)}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.card,
    margin: 6,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
});

export default CategoryGrid;