import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { FileItem as FileItemType } from '@/types/files';
import { formatFileSize, formatDate } from '@/utils/file-utils';
import Colors from '@/constants/colors';
import { 
  Star, 
  MoreVertical, 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Music, 
  Archive, 
  File 
} from 'lucide-react-native';
import { useSettingsStore } from '@/stores/settings-store';

interface FileItemProps {
  file: FileItemType;
  onPress: (file: FileItemType) => void;
  onLongPress?: (file: FileItemType) => void;
  onStarPress?: (file: FileItemType) => void;
  onMorePress?: (file: FileItemType) => void;
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

const FileItemComponent: React.FC<FileItemProps> = ({
  file,
  onPress,
  onLongPress,
  onStarPress,
  onMorePress,
}) => {
  const { showFileSize, showFileDate, showFilePath } = useSettingsStore();
  
  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress(file)}
      onLongPress={() => onLongPress && onLongPress(file)}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.05)' }}
    >
      {file.type === 'image' && file.thumbnail ? (
        <Image
          source={{ uri: file.thumbnail }}
          style={styles.thumbnail}
          contentFit="cover"
        />
      ) : (
        <View style={[styles.iconContainer, { backgroundColor: `${Colors.fileTypes[file.type]}20` }]}>
          <FileTypeIcon type={file.type} size={28} />
        </View>
      )}
      
      <View style={styles.details}>
        <Text style={styles.fileName} numberOfLines={1}>
          {file.name}
        </Text>
        
        <View style={styles.metaContainer}>
          {showFileSize && (
            <Text style={styles.metaText}>
              {formatFileSize(file.size)}
            </Text>
          )}
          
          {showFileDate && (
            <Text style={styles.metaText}>
              {formatDate(file.lastModified)}
            </Text>
          )}
          
          {showFilePath && file.path && (
            <Text style={styles.metaText} numberOfLines={1}>
              {file.path}
            </Text>
          )}
          
          {file.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {file.category}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.actions}>
        {onStarPress && (
          <Pressable
            style={styles.actionButton}
            onPress={() => onStarPress(file)}
            hitSlop={8}
          >
            <Star
              size={20}
              color={file.starred ? Colors.light.warning : Colors.light.secondaryText}
              fill={file.starred ? Colors.light.warning : 'transparent'}
            />
          </Pressable>
        )}
        
        {onMorePress && (
          <Pressable
            style={styles.actionButton}
            onPress={() => onMorePress(file)}
            hitSlop={8}
          >
            <MoreVertical size={20} color={Colors.light.secondaryText} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: Colors.light.secondaryText,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: 'rgba(65, 105, 225, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.light.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
});

export default FileItemComponent;