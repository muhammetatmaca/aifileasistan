import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, Search } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface AppHeaderProps {
  title: string;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  title, 
  onMenuPress, 
  onSearchPress 
}) => {
  return (
    <LinearGradient
      colors={['#4169E1', '#6495ED']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Pressable onPress={onMenuPress} style={styles.iconButton}>
          <Menu size={24} color="#FFFFFF" />
        </Pressable>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>File Manager</Text>
        </View>
        
        <Pressable onPress={onSearchPress} style={styles.iconButton}>
          <Search size={24} color="#FFFFFF" />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default AppHeader; 