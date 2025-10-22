import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const allPosts = [
  { slug: 'debuter-cpa', title: 'Débuter en CPA', excerpt: 'Les bases pour se lancer.', category: 'Débuter en CPA', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'strategies-avancees', title: 'Stratégies avancées', excerpt: 'Optimisations pour scaler.', category: 'Stratégies avancées', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop' },
  { slug: 'outils-recommandes', title: 'Outils recommandés', excerpt: 'Stack idéale pour le CPA.', category: 'Outils recommandés', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop' },
];

const categories = ['Tous', 'Débuter en CPA', 'Stratégies avancées', 'Outils recommandés'];

export default function BlogIndex() {
  const params = useLocalSearchParams();
  const [query, setQuery] = useState(typeof params.search === 'string' ? params.search : '');
  const [cat, setCat] = useState('Tous');

  const posts = useMemo(() => {
    return allPosts.filter(p => (cat === 'Tous' || p.category === cat) && (
      !query || p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase())
    ));
  }, [query, cat]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Blog & Ressources</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}> 
          <TextInput placeholder="Rechercher" placeholderTextColor="#9CA3AF" value={query} onChangeText={setQuery} style={{ flex: 1, backgroundColor: '#111827', color: 'white', padding: 12, borderRadius: 8 }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {categories.map(c => (
            <Pressable key={c} onPress={() => setCat(c)} style={{ backgroundColor: cat === c ? '#2563EB' : '#1F2937', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 }}>
              <Text style={{ color: 'white' }}>{c}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ gap: 12 }}>
          {posts.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} asChild>
              <Pressable style={{ backgroundColor: '#111827', borderRadius: 12, overflow: 'hidden' }}>
                <Image source={{ uri: p.image }} style={{ width: '100%', height: 160 }} />
                <View style={{ padding: 12 }}>
                  <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>{p.title}</Text>
                  <Text style={{ color: '#9CA3AF' }}>{p.excerpt}</Text>
                  <Text style={{ color: '#6B7280', marginTop: 4 }}>{p.category}</Text>
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
