import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  Pressable, 
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSettingsStore } from '@/stores/settings-store';
import { useChatStore } from '@/stores/chat-store';
import Colors from '@/constants/colors';
import { 
  ArrowLeft, 
  HardDrive, 
  Calendar, 
  FolderOpen, 
  SortAsc, 
  Trash2, 
  Info, 
  MessageSquare 
} from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { 
    showFileSize, 
    showFileDate, 
    showFilePath, 
    sortBy, 
    sortDirection,
    toggleShowFileSize,
    toggleShowFileDate,
    toggleShowFilePath,
    setSortBy,
    setSortDirection
  } = useSettingsStore();
  
  const { clearMessages } = useChatStore();
  
  const handleClearChat = () => {
    clearMessages();
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
        
        <Text style={styles.headerTitle}>Settings</Text>
      </LinearGradient>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>File View</Text>
        
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <HardDrive size={20} color={Colors.light.secondaryText} />
              <Text style={styles.settingLabel}>Show File Size</Text>
            </View>
            <Switch
              value={showFileSize}
              onValueChange={toggleShowFileSize}
              trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Calendar size={20} color={Colors.light.secondaryText} />
              <Text style={styles.settingLabel}>Show File Date</Text>
            </View>
            <Switch
              value={showFileDate}
              onValueChange={toggleShowFileDate}
              trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <FolderOpen size={20} color={Colors.light.secondaryText} />
              <Text style={styles.settingLabel}>Show File Path</Text>
            </View>
            <Switch
              value={showFilePath}
              onValueChange={toggleShowFilePath}
              trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Sorting</Text>
        
        <View style={styles.settingsGroup}>
          <Pressable 
            style={styles.settingItem}
            onPress={() => setSortBy('name')}
          >
            <Text style={styles.settingLabel}>By Name</Text>
            <View style={styles.radioButton}>
              {sortBy === 'name' && <View style={styles.radioButtonInner} />}
            </View>
          </Pressable>
          
          <View style={styles.divider} />
          
          <Pressable 
            style={styles.settingItem}
            onPress={() => setSortBy('date')}
          >
            <Text style={styles.settingLabel}>By Date</Text>
            <View style={styles.radioButton}>
              {sortBy === 'date' && <View style={styles.radioButtonInner} />}
            </View>
          </Pressable>
          
          <View style={styles.divider} />
          
          <Pressable 
            style={styles.settingItem}
            onPress={() => setSortBy('size')}
          >
            <Text style={styles.settingLabel}>By Size</Text>
            <View style={styles.radioButton}>
              {sortBy === 'size' && <View style={styles.radioButtonInner} />}
            </View>
          </Pressable>
          
          <View style={styles.divider} />
          
          <Pressable 
            style={styles.settingItem}
            onPress={() => setSortBy('type')}
          >
            <Text style={styles.settingLabel}>By Type</Text>
            <View style={styles.radioButton}>
              {sortBy === 'type' && <View style={styles.radioButtonInner} />}
            </View>
          </Pressable>
          
          <View style={styles.divider} />
          
          <Pressable 
            style={styles.settingItem}
            onPress={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          >
            <View style={styles.settingInfo}>
              <SortAsc size={20} color={Colors.light.secondaryText} />
              <Text style={styles.settingLabel}>
                {sortDirection === 'asc' ? 'Ascending Order' : 'Descending Order'}
              </Text>
            </View>
            <Switch
              value={sortDirection === 'asc'}
              onValueChange={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
              thumbColor="#FFFFFF"
            />
          </Pressable>
        </View>
        
        <Text style={styles.sectionTitle}>Data</Text>
        
        <View style={styles.settingsGroup}>
          <Pressable 
            style={styles.settingItem}
            onPress={handleClearChat}
          >
            <View style={styles.settingInfo}>
              <MessageSquare size={20} color={Colors.light.error} />
              <Text style={[styles.settingLabel, { color: Colors.light.error }]}>
                Clear Chat History
              </Text>
            </View>
          </Pressable>
        </View>
        
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Info size={20} color={Colors.light.secondaryText} />
              <Text style={styles.settingLabel}>App Version</Text>
            </View>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 12,
    marginTop: 24,
  },
  settingsGroup: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginHorizontal: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
  },
  versionText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
});