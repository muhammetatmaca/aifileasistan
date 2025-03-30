import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Smartphone } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface StorageInfoProps {
  used: number; // in GB
  total: number; // in GB
}

const StorageInfo: React.FC<StorageInfoProps> = ({ used, total }) => {
  const usedPercentage = (used / total) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Smartphone size={24} color="#FFFFFF" />
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Phone Storage</Text>
          <Text style={styles.subtitle}>{used.toFixed(2)} GB used of {total.toFixed(2)} GB</Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${usedPercentage}%` }
              ]} 
            />
          </View>
          
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>{used.toFixed(2)} GB</Text>
            <Text style={styles.progressLabel}>{total.toFixed(2)} GB</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#26C6DA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  titleRow: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.light.secondaryText,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4169E1',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.light.secondaryText,
  },
});

export default StorageInfo;