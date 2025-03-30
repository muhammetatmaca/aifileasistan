import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { ChatMessage as ChatMessageType, FileItem } from '@/types/files';
import Colors from '@/constants/colors';
import { formatDate, formatFileSize } from '@/utils/file-utils';
import { 
  Image as ImageIcon, 
  FileText, 
  Video, 
  Music, 
  Archive, 
  File,
  User,
  MessageSquare
} from 'lucide-react-native';

interface ChatMessageProps {
  message: ChatMessageType;
  onFilePress?: (file: FileItem) => void;
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

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFilePress }) => {
  const isUser = message.sender === 'user';
  
  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.assistantContainer
    ]}>
      {!isUser && (
        <View style={styles.avatar}>
          <MessageSquare size={20} color="#FFFFFF" />
        </View>
      )}
      
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.assistantBubble
      ]}>
        {message.isLoading ? (
          <ActivityIndicator color={isUser ? "#FFFFFF" : Colors.light.primary} size="small" />
        ) : (
          <>
            <Text style={[
              styles.text,
              isUser ? styles.userText : styles.assistantText
            ]}>
              {message.text}
            </Text>
            
            {message.relatedFiles && message.relatedFiles.length > 0 && (
              <View style={styles.filesContainer}>
                {message.relatedFiles.map((file) => (
                  <Pressable
                    key={file.id}
                    style={styles.fileItem}
                    onPress={() => onFilePress && onFilePress(file)}
                  >
                    {file.type === 'image' && file.thumbnail ? (
                      <Image
                        source={{ uri: file.thumbnail }}
                        style={styles.fileThumbnail}
                        contentFit="cover"
                      />
                    ) : (
                      <View style={[
                        styles.fileIconContainer,
                        { backgroundColor: `${Colors.fileTypes[file.type]}20` }
                      ]}>
                        <FileTypeIcon type={file.type} size={20} />
                      </View>
                    )}
                    
                    <View style={styles.fileDetails}>
                      <Text style={styles.fileName} numberOfLines={1}>
                        {file.name}
                      </Text>
                      <Text style={styles.fileSize}>
                        {formatFileSize(file.size)}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          </>
        )}
      </View>
      
      {isUser && (
        <View style={styles.avatar}>
          <User size={20} color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userBubble: {
    backgroundColor: Colors.light.primary,
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: Colors.light.card,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: Colors.light.text,
  },
  filesContainer: {
    marginTop: 12,
  },
  fileItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  fileThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileDetails: {
    marginLeft: 8,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  fileSize: {
    fontSize: 12,
    color: Colors.light.secondaryText,
    marginTop: 2,
  },
});

export default ChatMessage;