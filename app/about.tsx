import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function AboutPage() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 8 }}>À propos</Text>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328d13f1?q=80&w=1200&auto=format&fit=crop' }} style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 16 }} />
        <Section title="Mon parcours">
          Je travaille dans le CPA marketing depuis plusieurs années. J'ai lancé ce site pour partager mes méthodes et éviter aux débutants de perdre du temps et de l'argent.
        </Section>
        <Section title="Pourquoi ce site ?">
          Centraliser des offres fiables, proposer des ressources concrètes et une boutique de produits utiles pour accélérer votre progression.
        </Section>
        <Section title="Mes valeurs">
          Transparence, pragmatisme et accompagnement. Je privilégie ce qui fonctionne réellement sur le terrain.
        </Section>
      </ScrollView>
      <SiteFooter />
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ backgroundColor: '#111827', padding: 16, borderRadius: 12, marginBottom: 12 }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 6 }}>{title}</Text>
      <Text style={{ color: '#9CA3AF' }}>{children}</Text>
    </View>
  );
}
