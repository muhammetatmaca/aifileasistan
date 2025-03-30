import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/colors';
import { Search, X, Mic } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onVoiceSearch?: () => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  onVoiceSearch,
  placeholder = 'Dosya ara...',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <Search size={20} color={Colors.light.secondaryText} />
      </View>
      
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.secondaryText}
        selectionColor={Colors.light.primary}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {value ? (
        <Pressable onPress={onClear} style={styles.clearButton}>
          <X size={20} color={Colors.light.secondaryText} />
        </Pressable>
      ) : onVoiceSearch ? (
        <Pressable onPress={onVoiceSearch} style={styles.voiceButton}>
          <Mic size={20} color={Colors.light.secondaryText} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  voiceButton: {
    padding: 4,
  },
});

export default SearchBar;