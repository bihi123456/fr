import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const contentBySlug: Record<string, { title: string; image: string; body: string }> = {
  'debuter-cpa': {
    title: 'Débuter en CPA',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    body: 'Comprendre les bases: offres, tracking, trafic, ROI. Commencez petit, testez, itérez.'
  },
  'strategies-avancees': {
    title: 'Stratégies avancées',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop',
    body: 'Optimisations: split testing, ciblage précis, scaling par sources et créas, automation.'
  },
  'outils-recommandes': {
    title: 'Outils recommandés',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    body: 'Trackers, spy tools, CRM, gestion de budgets: la stack utile pour gagner du temps.'
  }
};

export default function BlogArticle() {
  const { slug } = useLocalSearchParams();
  const key = typeof slug === 'string' ? slug : '';
  const post = contentBySlug[key];

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {post ? (
          <View>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 8 }}>{post.title}</Text>
            <Image source={{ uri: post.image }} style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 12 }} />
            <Text style={{ color: '#E5E7EB', lineHeight: 22 }}>{post.body}</Text>
          </View>
        ) : (
          <Text style={{ color: 'white' }}>Article introuvable.</Text>
        )}
      </ScrollView>
      <SiteFooter />
    </View>
  );
}
