import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable 
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFileStore } from '@/stores/file-store';
import Colors from '@/constants/colors';
import { 
  formatFileSize, 
  formatDate
} from '@/utils/file-utils';
import { 
  Calendar, 
  HardDrive, 
  FolderOpen, 
  Star, 
  Share2, 
  Download, 
  Trash2, 
  ArrowLeft,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  Archive,
  File
} from 'lucide-react-native';

const FileTypeIcon = ({ type, size = 24 }: { type: string, size?: number }) => {
  switch (type) {
    case 'image':
      return <ImageIcon size={size} color={Colors.fileTypes.image} />;
    case 'video':
      return <Video size={size} color={Colors.fileTypes.video} />;
    case 'document':
      return <FileText size={size} color={Colors.fileTypes.document} />;
    case 'audio':
      return <Music size={size} color={Colors.fileTypes.audio} />;
    case 'archive':
      return <Archive size={size} color={Colors.fileTypes.archive} />;
    default:
      return <File size={size} color={Colors.fileTypes.unknown} />;
  }
};

export default function FileDetailsScreen() {
  const router = useRouter();
  const { selectedFile, toggleStarred, deleteFile } = useFileStore();
  
  if (!selectedFile) {
    router.back();
    return null;
  }
  
  const handleDelete = () => {
    deleteFile(selectedFile.id);
    router.back();
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
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        
        <Text style={styles.headerTitle}>File Details</Text>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filePreview}>
          {selectedFile.type === 'image' && selectedFile.thumbnail ? (
            <Image
              source={{ uri: selectedFile.thumbnail }}
              style={styles.previewImage}
              contentFit="cover"
            />
          ) : (
            <View style={[
              styles.iconPreview, 
              { backgroundColor: `${Colors.fileTypes[selectedFile.type]}20` }
            ]}>
              <FileTypeIcon type={selectedFile.type} size={48} />
            </View>
          )}
        </View>
        
        <Text style={styles.fileName}>{selectedFile.name}</Text>
        
        <View style={styles.metaSection}>
          <View style={styles.metaItem}>
            <FileTypeIcon type={selectedFile.type} />
            <Text style={styles.metaText}>
              {selectedFile.type.charAt(0).toUpperCase() + selectedFile.type.slice(1)}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <HardDrive size={24} color={Colors.light.secondaryText} />
            <Text style={styles.metaText}>
              {formatFileSize(selectedFile.size)}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Calendar size={24} color={Colors.light.secondaryText} />
            <Text style={styles.metaText}>
              {formatDate(selectedFile.lastModified)}
            </Text>
          </View>
          
          {selectedFile.category && (
            <View style={styles.metaItem}>
              <FolderOpen size={24} color={Colors.light.secondaryText} />
              <Text style={styles.metaText}>
                {selectedFile.category}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.actionsSection}>
          <Pressable 
            style={styles.actionButton}
            onPress={() => toggleStarred(selectedFile.id)}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.light.warning }]}>
              <Star 
                size={24} 
                color="#FFFFFF" 
                fill={selectedFile.starred ? "#FFFFFF" : "transparent"} 
              />
            </View>
            <Text style={styles.actionText}>
              {selectedFile.starred ? "Unstar" : "Star"}
            </Text>
          </Pressable>
          
          <Pressable style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.light.info }]}>
              <Share2 size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Share</Text>
          </Pressable>
          
          <Pressable style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.light.success }]}>
              <Download size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Download</Text>
          </Pressable>
          
          <Pressable 
            style={styles.actionButton}
            onPress={handleDelete}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.light.error }]}>
              <Trash2 size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        </View>
        
        {selectedFile.path && (
          <View style={styles.pathSection}>
            <Text style={styles.sectionTitle}>File Path</Text>
            <Text style={styles.pathText}>{selectedFile.path}</Text>
          </View>
        )}
      </ScrollView>
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
    padding: 16,
  },
  filePreview: {
    alignItems: 'center',
    marginBottom: 24,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  iconPreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  metaSection: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 12,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: Colors.light.text,
  },
  pathSection: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  pathText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
});