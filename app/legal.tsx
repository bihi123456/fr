import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function LegalPage() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Mentions légales</Text>
        <Section title="Éditeur du site">CPA Pro — Contact: contact@example.com</Section>
        <Section title="Hébergement">Vercel/Expo — Adresse postale selon l'hébergeur</Section>
        <Section title="Données personnelles">Nous respectons la confidentialité et ne partageons pas vos données sans consentement.</Section>
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
