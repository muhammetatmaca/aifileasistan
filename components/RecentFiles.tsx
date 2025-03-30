import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { FileItem } from '@/types/files';
import Colors from '@/constants/colors';
import { formatDate } from '@/utils/file-utils';
import { 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Music, 
  Archive, 
  File 
} from 'lucide-react-native';

interface RecentFilesProps {
  files: FileItem[];
  onFilePress: (file: FileItem) => void;
}

const FileTypeIcon = ({ type, size = 24, color }: { type: string, size?: number, color?: string }) => {
  const iconColor = color || Colors.fileTypes[type] || Colors.fileTypes.unknown;
  
  switch (type) {
    case 'image':
      return <ImageIcon size={size} color={iconColor} />;
    case 'video':
      return <Video size={size} color={iconColor} />;
    case 'document':
      return <FileText size={size} color={iconColor} />;
    case 'audio':
      return <Music size={size} color={iconColor} />;
    case 'archive':
      return <Archive size={size} color={iconColor} />;
    default:
      return <File size={size} color={iconColor} />;
  }
};

const RecentFiles: React.FC<RecentFilesProps> = ({ files, onFilePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Files</Text>
      
      <FlatList
        data={files.slice(0, 5)} // Show only the 5 most recent files
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.fileItem}
            onPress={() => onFilePress(item)}
            android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
          >
            {item.type === 'image' && item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.iconContainer, { backgroundColor: `${Colors.fileTypes[item.type]}20` }]}>
                <FileTypeIcon type={item.type} />
              </View>
            )}
            
            <View style={styles.fileInfo}>
              <Text style={styles.fileName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.fileDate}>
                {formatDate(item.lastModified)}
              </Text>
            </View>
          </Pressable>
        )}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  fileDate: {
    fontSize: 12,
    color: Colors.light.secondaryText,
    marginTop: 4,
  },
});

export default RecentFiles;