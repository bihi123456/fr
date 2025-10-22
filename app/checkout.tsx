import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { useCart } from '../lib/cart';
import { useRouter } from 'expo-router';

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [method, setMethod] = useState<'stripe' | 'paypal'>('stripe');

  function onPay() {
    if (!name || !email) { Alert.alert('Champs requis', 'Renseignez votre nom et email'); return; }
    if (cart.items.length === 0) { Alert.alert('Panier vide', 'Ajoutez des produits'); return; }
    // Simulate payment success
    const orderId = Math.random().toString(36).slice(2, 10);
    cart.clear();
    router.replace({ pathname: '/order-confirmation', params: { orderId, email } });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Paiement sécurisé</Text>
        <Field label="Nom complet" value={name} onChangeText={setName} />
        <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Field label="Adresse (optionnel)" value={address} onChangeText={setAddress} />
        <Field label="Méthode (stripe | paypal)" value={method} onChangeText={(t) => setMethod((t as any) || 'stripe')} />
        <Text style={{ color: 'white', fontWeight: '800', marginTop: 8 }}>Total: {cart.total.toFixed(2)} €</Text>
        <Pressable onPress={onPay} style={{ backgroundColor: '#10B981', padding: 14, borderRadius: 10, marginTop: 12 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Payer maintenant</Text>
        </Pressable>
      </ScrollView>
      <SiteFooter />
    </View>
  );
}

function Field(props: any) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: '#9CA3AF', fontSize: 12, marginBottom: 4 }}>{props.label}</Text>
      <TextInput {...props} placeholderTextColor="#999" style={{ backgroundColor: '#111827', color: 'white', padding: 12, borderRadius: 8 }} />
    </View>
  );
}
