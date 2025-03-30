import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { FileItem } from '@/types/files';
import Colors from '@/constants/colors';
import { 
  Share2, 
  Download, 
  Trash2, 
  Pencil, 
  Copy, 
  Star, 
  FolderPlus, 
  Info, 
  X 
} from 'lucide-react-native';

interface FileActionSheetProps {
  file: FileItem | null;
  visible: boolean;
  onClose: () => void;
  onDelete: (file: FileItem) => void;
  onRename: (file: FileItem) => void;
  onStar: (file: FileItem) => void;
  onMove: (file: FileItem) => void;
  onCopy: (file: FileItem) => void;
  onShare: (file: FileItem) => void;
  onInfo: (file: FileItem) => void;
}

const ActionButton = ({ 
  icon, 
  label, 
  onPress, 
  color = Colors.light.text 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onPress: () => void; 
  color?: string;
}) => (
  <Pressable style={styles.actionButton} onPress={onPress}>
    <View style={styles.actionIcon}>
      {icon}
    </View>
    <Text style={[styles.actionLabel, { color }]}>{label}</Text>
  </Pressable>
);

const FileActionSheet: React.FC<FileActionSheetProps> = ({
  file,
  visible,
  onClose,
  onDelete,
  onRename,
  onStar,
  onMove,
  onCopy,
  onShare,
  onInfo,
}) => {
  if (!file) return null;
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {file.name}
            </Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={Colors.light.text} />
            </Pressable>
          </View>
          
          <View style={styles.actionsContainer}>
            <ActionButton
              icon={<Share2 size={24} color={Colors.light.info} />}
              label="Paylaş"
              onPress={() => onShare(file)}
            />
            
            <ActionButton
              icon={<Download size={24} color={Colors.light.success} />}
              label="İndir"
              onPress={() => {}}
            />
            
            <ActionButton
              icon={<Star size={24} color={Colors.light.warning} fill={file.starred ? Colors.light.warning : 'transparent'} />}
              label={file.starred ? "Yıldızı Kaldır" : "Yıldızla"}
              onPress={() => onStar(file)}
            />
            
            <ActionButton
              icon={<Pencil size={24} color={Colors.light.info} />}
              label="Yeniden Adlandır"
              onPress={() => onRename(file)}
            />
            
            <ActionButton
              icon={<FolderPlus size={24} color={Colors.light.primary} />}
              label="Taşı"
              onPress={() => onMove(file)}
            />
            
            <ActionButton
              icon={<Copy size={24} color={Colors.light.primary} />}
              label="Kopyala"
              onPress={() => onCopy(file)}
            />
            
            <ActionButton
              icon={<Info size={24} color={Colors.light.info} />}
              label="Bilgi"
              onPress={() => onInfo(file)}
            />
            
            <ActionButton
              icon={<Trash2 size={24} color={Colors.light.error} />}
              label="Sil"
              onPress={() => onDelete(file)}
              color={Colors.light.error}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default FileActionSheet;