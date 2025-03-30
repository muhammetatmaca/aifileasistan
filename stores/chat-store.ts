import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChatMessage } from '@/types/files';
import { processUserQuery } from '@/utils/ai-utils';
import { useFileStore } from './file-store';

interface ChatState {
  messages: ChatMessage[];
  isProcessing: boolean;
  currentAction: string | null;
  actionData: any | null;
  
  // Actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  processUserMessage: (text: string) => Promise<void>;
  setCurrentAction: (action: string | null, data?: any) => void;
  completeAction: (result?: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: '1',
          text: "Merhaba! Ben dosya asistanınızım. Size nasıl yardımcı olabilirim?",
          sender: 'assistant',
          timestamp: new Date().toISOString(),
        }
      ],
      isProcessing: false,
      currentAction: null,
      actionData: null,
      
      addMessage: (message) => set((state) => ({
        messages: [
          ...state.messages, 
          {
            ...message,
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
          }
        ]
      })),
      
      clearMessages: () => set({ 
        messages: [{
          id: Date.now().toString(),
          text: "Merhaba! Ben dosya asistanınızım. Size nasıl yardımcı olabilirim?",
          sender: 'assistant',
          timestamp: new Date().toISOString(),
        }],
        currentAction: null,
        actionData: null
      }),
      
      setCurrentAction: (action, data) => set({
        currentAction: action,
        actionData: data || null
      }),
      
      completeAction: (result) => {
        const { currentAction, actionData } = get();
        
        if (currentAction) {
          // Add a completion message based on the action type
          let completionMessage = "";
          
          switch (currentAction) {
            case 'create_collage':
              completionMessage = `Kolaj oluşturuldu! ${actionData?.images?.length || 0} fotoğraftan oluşan ${actionData?.title || 'kolaj'} hazır.`;
              break;
            case 'edit_photo':
              completionMessage = `Fotoğraf düzenlendi! ${result || 'Seçilen filtre'} uygulandı.`;
              break;
            case 'junk_cleaner':
              completionMessage = `Temizlik tamamlandı! ${actionData?.potentialSpace || 0} GB alan boşaltıldı.`;
              break;
            case 'analyze_storage':
              completionMessage = "Analiz tamamlandı! Detaylı raporu görüntüleyebilirsiniz.";
              break;
            case 'compress_files':
              completionMessage = `Sıkıştırma tamamlandı! Dosyalar ${actionData?.outputFormat || 'zip'} formatında kaydedildi.`;
              break;
            case 'backup_files':
              completionMessage = "Yedekleme tamamlandı! Tüm dosyalarınız güvende.";
              break;
            default:
              completionMessage = "İşlem tamamlandı!";
          }
          
          get().addMessage({
            text: completionMessage,
            sender: 'assistant',
          });
          
          // Reset the current action
          set({
            currentAction: null,
            actionData: null
          });
        }
      },
      
      processUserMessage: async (text) => {
        // Add user message
        get().addMessage({
          text,
          sender: 'user',
        });
        
        // Set processing state
        set({ isProcessing: true });
        
        // Add loading message
        const loadingMessageId = Date.now().toString();
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: loadingMessageId,
              text: "...",
              sender: 'assistant',
              timestamp: new Date().toISOString(),
              isLoading: true,
            }
          ]
        }));
        
        try {
          // Simulate network delay for more realistic AI response
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Process the query
          const { response, files, action, actionData } = processUserQuery(text);
          
          // Remove loading message and add response
          set((state) => ({
            messages: state.messages
              .filter(msg => msg.id !== loadingMessageId)
              .concat({
                id: Date.now().toString(),
                text: response,
                sender: 'assistant',
                timestamp: new Date().toISOString(),
                relatedFiles: files.length > 0 ? files : undefined,
              }),
            isProcessing: false,
          }));
          
          // If there's an action to perform, set it
          if (action) {
            get().setCurrentAction(action, actionData);
            
            // Simulate action completion after a delay
            setTimeout(() => {
              get().completeAction();
            }, 3000);
          }
        } catch (error) {
          // Handle error
          set((state) => ({
            messages: state.messages
              .filter(msg => msg.id !== loadingMessageId)
              .concat({
                id: Date.now().toString(),
                text: "Üzgünüm, isteğinizi işlerken bir hata oluştu.",
                sender: 'assistant',
                timestamp: new Date().toISOString(),
              }),
            isProcessing: false,
          }));
        }
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);