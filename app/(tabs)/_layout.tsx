import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Offres', tabBarIcon: ({ color, size }) => (<FontAwesome name="gift" color={color} size={size} />) }} />
      <Tabs.Screen name="stats" options={{ title: 'Statistiques', tabBarIcon: ({ color, size }) => (<FontAwesome name="line-chart" color={color} size={size} />) }} />
      <Tabs.Screen name="rewards" options={{ title: 'Récompenses', tabBarIcon: ({ color, size }) => (<FontAwesome name="trophy" color={color} size={size} />) }} />
      <Tabs.Screen name="referrals" options={{ title: 'Parrainage', tabBarIcon: ({ color, size }) => (<FontAwesome name="users" color={color} size={size} />) }} />
      <Tabs.Screen name="support" options={{ title: 'Support', tabBarIcon: ({ color, size }) => (<FontAwesome name="question-circle" color={color} size={size} />) }} />
    </Tabs>
  );
}
