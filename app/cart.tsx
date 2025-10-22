import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { products, useCart } from '../lib/cart';
import { Link, useRouter } from 'expo-router';

export default function CartPage() {
  const cart = useCart();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Panier</Text>
        {cart.items.length === 0 ? (
          <View>
            <Text style={{ color: '#9CA3AF' }}>Votre panier est vide.</Text>
            <Link href="/shop" asChild>
              <Pressable style={{ backgroundColor: '#2563EB', padding: 12, borderRadius: 8, marginTop: 12 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Continuer mes achats</Text>
              </Pressable>
            </Link>
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {cart.items.map((it) => {
              const p = products.find(pp => pp.id === it.productId)!;
              return (
                <View key={it.productId} style={{ backgroundColor: '#111827', padding: 12, borderRadius: 10 }}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>{p.title}</Text>
                  <Text style={{ color: '#9CA3AF' }}>{p.price.toFixed(2)} €</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <Text style={{ color: '#E5E7EB' }}>Qté</Text>
                    <TextInput keyboardType="numeric" defaultValue={String(it.quantity)} onChangeText={(t) => cart.setQty(it.productId, Math.max(1, Number(t) || 1))} style={{ backgroundColor: '#1F2937', color: 'white', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, minWidth: 60 }} />
                    <Pressable onPress={() => cart.remove(it.productId)} style={{ backgroundColor: '#b91c1c', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 }}>
                      <Text style={{ color: 'white' }}>Retirer</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>Total: {cart.total.toFixed(2)} €</Text>
            <Pressable onPress={() => router.push('/checkout')} style={{ backgroundColor: '#10B981', padding: 14, borderRadius: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Procéder au paiement</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
      <SiteFooter />
    </View>
  );
}
