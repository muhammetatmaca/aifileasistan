import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Category } from '@/types/files';
import Colors from '@/constants/colors';
import { 
  Image, 
  FileText, 
  Video, 
  Music, 
  Archive, 
  Star, 
  Briefcase, 
  User, 
  Folder 
} from 'lucide-react-native';

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onPress: (category: Category) => void;
}

const CategoryIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Image':
      return <Image size={24} color="#FFFFFF" />;
    case 'FileText':
      return <FileText size={24} color="#FFFFFF" />;
    case 'Video':
      return <Video size={24} color="#FFFFFF" />;
    case 'Music':
      return <Music size={24} color="#FFFFFF" />;
    case 'Archive':
      return <Archive size={24} color="#FFFFFF" />;
    case 'Star':
      return <Star size={24} color="#FFFFFF" />;
    case 'Briefcase':
      return <Briefcase size={24} color="#FFFFFF" />;
    case 'User':
      return <User size={24} color="#FFFFFF" />;
    default:
      return <Folder size={24} color="#FFFFFF" />;
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        isSelected && styles.selectedContainer
      ]}
      onPress={() => onPress(category)}
    >
      <View 
        style={[
          styles.iconContainer,
          { backgroundColor: category.color },
          isSelected && styles.selectedIconContainer
        ]}
      >
        <CategoryIcon name={category.icon} />
      </View>
      
      <Text 
        style={[
          styles.name,
          isSelected && styles.selectedName
        ]}
        numberOfLines={1}
      >
        {category.name}
      </Text>
      
      <Text style={styles.count}>
        {category.count} {category.count === 1 ? 'dosya' : 'dosya'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 130,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  selectedContainer: {
    backgroundColor: Colors.light.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  selectedName: {
    color: '#FFFFFF',
  },
  count: {
    fontSize: 12,
    color: Colors.light.secondaryText,
  },
});

export default CategoryCard;