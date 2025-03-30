import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useChatStore } from '@/stores/chat-store';
import { useFileStore } from '@/stores/file-store';
import Colors from '@/constants/colors';
import ChatMessage from '@/components/ChatMessage';
import EmptyState from '@/components/EmptyState';
import { Send, Mic, ArrowLeft, MessageSquare } from 'lucide-react-native';

export default function ChatScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const { messages, isProcessing, processUserMessage, clearMessages } = useChatStore();
  const { setSelectedFile } = useFileStore();
  
  const handleSend = async () => {
    if (!inputText.trim() || isProcessing) return;
    
    const text = inputText;
    setInputText('');
    await processUserMessage(text);
    
    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  const handleFilePress = (file) => {
    setSelectedFile(file);
    router.push('/file-details');
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, [messages]);
  
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
        
        <View style={styles.headerContent}>
          <View style={styles.assistantAvatar}>
            <MessageSquare size={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Text style={styles.headerSubtitle}>Ask me about your files</Text>
          </View>
        </View>
      </LinearGradient>
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.chatContainer}>
          {messages.length === 0 ? (
            <EmptyState 
              type="chat" 
              message="Ask the assistant a question to get started" 
            />
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ChatMessage 
                  message={item} 
                  onFilePress={handleFilePress}
                />
              )}
              contentContainerStyle={styles.messagesList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask about your files..."
            placeholderTextColor={Colors.light.secondaryText}
            multiline
            maxLength={500}
            onSubmitEditing={handleSend}
            editable={!isProcessing}
          />
          
          <Pressable 
            style={[styles.sendButton, !inputText.trim() && styles.disabledButton]}
            onPress={handleSend}
            disabled={!inputText.trim() || isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Send size={20} color="#FFFFFF" />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assistantAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messagesList: {
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.light.card,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 40,
    color: Colors.light.text,
    maxHeight: 120,
    fontSize: 16,
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    bottom: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(65, 105, 225, 0.5)',
  },
});