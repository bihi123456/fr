import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function OrderConfirmation() {
  const { orderId, email } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <View style={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 8 }}>Commande confirmée</Text>
        <Text style={{ color: '#9CA3AF' }}>Merci pour votre achat.</Text>
        <Text style={{ color: '#E5E7EB', marginTop: 6 }}>ID commande: {typeof orderId === 'string' ? orderId : ''}</Text>
        <Text style={{ color: '#E5E7EB' }}>Un email de confirmation a été envoyé à: {typeof email === 'string' ? email : ''}</Text>
      </View>
      <SiteFooter />
    </View>
  );
}
