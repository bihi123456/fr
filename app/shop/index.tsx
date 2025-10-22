import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ScrollView } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { products } from '../../lib/cart';

const categories = ['Tous', ...Array.from(new Set(products.map(p => p.category)))];

export default function ShopIndex() {
  const params = useLocalSearchParams();
  const [query, setQuery] = useState(typeof params.search === 'string' ? params.search : '');
  const [cat, setCat] = useState('Tous');

  const list = useMemo(() => {
    return products.filter(p => (cat === 'Tous' || p.category === cat) && (!query || p.title.toLowerCase().includes(query.toLowerCase())));
  }, [query, cat]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Boutique</Text>
        <TextInput placeholder="Rechercher un produit" placeholderTextColor="#9CA3AF" value={query} onChangeText={setQuery} style={{ backgroundColor: '#111827', color: 'white', padding: 12, borderRadius: 8, marginBottom: 12 }} />
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {categories.map(c => (
            <Pressable key={c} onPress={() => setCat(c)} style={{ backgroundColor: cat === c ? '#2563EB' : '#1F2937', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 }}>
              <Text style={{ color: 'white' }}>{c}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ gap: 12 }}>
          {list.map(p => (
            <Link key={p.id} href={`/shop/${p.id}`} asChild>
              <Pressable style={{ backgroundColor: '#111827', borderRadius: 12, overflow: 'hidden' }}>
                <Image source={{ uri: p.image }} style={{ width: '100%', height: 160 }} />
                <View style={{ padding: 12 }}>
                  <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>{p.title}</Text>
                  <Text style={{ color: '#9CA3AF' }}>{p.description}</Text>
                  <Text style={{ color: '#E5E7EB', marginTop: 4 }}>{p.price.toFixed(2)} €</Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
      <SiteFooter />
    </View>
  );
}
