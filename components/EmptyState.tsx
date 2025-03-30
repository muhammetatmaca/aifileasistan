import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { FileSearch, FolderOpen, MessageSquareText } from 'lucide-react-native';

interface EmptyStateProps {
  type: 'files' | 'search' | 'chat';
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  message,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'files':
        return <FolderOpen size={64} color={Colors.light.secondaryText} />;
      case 'search':
        return <FileSearch size={64} color={Colors.light.secondaryText} />;
      case 'chat':
        return <MessageSquareText size={64} color={Colors.light.secondaryText} />;
      default:
        return <FolderOpen size={64} color={Colors.light.secondaryText} />;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'files':
        return 'Henüz dosya yok';
      case 'search':
        return 'Arama sonucu bulunamadı';
      case 'chat':
        return 'Sohbet geçmişi yok';
      default:
        return 'İçerik bulunamadı';
    }
  };

  return (
    <View style={styles.container}>
      {getIcon()}
      <Text style={styles.message}>
        {message || getDefaultMessage()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: Colors.light.secondaryText,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default EmptyState;