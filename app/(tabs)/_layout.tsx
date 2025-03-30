import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/colors';
import { MessageSquare, FolderOpen, Grid3x3 } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.secondaryText,
        tabBarStyle: {
          backgroundColor: Colors.light.card,
          borderTopColor: Colors.light.border,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ color, size }) => (
            <FolderOpen size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <Grid3x3 size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}