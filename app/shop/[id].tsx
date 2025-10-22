import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { products, useCart } from '../../lib/cart';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const pid = typeof id === 'string' ? id : '';
  const product = products.find(p => p.id === pid);
  const cart = useCart();

  if (!product) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
        <SiteHeader />
        <View style={{ padding: 16 }}>
          <Text style={{ color: 'white' }}>Produit introuvable.</Text>
        </View>
        <SiteFooter />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Image source={{ uri: product.image }} style={{ width: '100%', height: 220, borderRadius: 12, marginBottom: 12 }} />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800' }}>{product.title}</Text>
        <Text style={{ color: '#E5E7EB', marginTop: 8 }}>{product.description}</Text>
        <Text style={{ color: '#34D399', fontWeight: '800', fontSize: 18, marginTop: 8 }}>{product.price.toFixed(2)} €</Text>
        <Pressable onPress={() => cart.add(product.id)} style={{ backgroundColor: '#10B981', padding: 14, borderRadius: 10, marginTop: 12 }}>
          <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}>Ajouter au panier</Text>
        </Pressable>
      </ScrollView>
      <SiteFooter />
    </View>
  );
}
