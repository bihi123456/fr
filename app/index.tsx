import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { firebaseAuth } from '../lib/firebase';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      setIsAuthed(!!user);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  if (isLoading) return null;
  if (isAuthed) return <Redirect href="/(tabs)" />;

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Hero */}
        <View style={{ paddingHorizontal: 16, paddingTop: 28, paddingBottom: 24, alignItems: 'center' }}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop' }} style={{ width: '100%', height: 200, borderRadius: 16, marginBottom: 16 }} />
          <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 8 }}>
            Gagnez de l'argent avec le CPA
          </Text>
          <Text style={{ color: '#9CA3AF', fontSize: 16, textAlign: 'center', marginBottom: 16 }}>
            Découvrez nos offres CPA, nos ressources exclusives et une boutique dédiée aux marketeurs.
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/(tabs)" asChild>
              <Pressable style={{ backgroundColor: '#10B981', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Découvrir les offres</Text>
              </Pressable>
            </Link>
            <Link href="/shop" asChild>
              <Pressable style={{ backgroundColor: '#1F2937', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Visiter la boutique</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Présentation */}
        <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
          <View style={{ backgroundColor: '#111827', padding: 16, borderRadius: 12 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Notre mission</Text>
            <Text style={{ color: '#9CA3AF' }}>
              Nous aidons les débutants et les experts en CPA marketing à trouver des offres rentables
              et à progresser grâce à des guides, outils et formations sélectionnés.
            </Text>
          </View>
        </View>

        {/* Témoignages */}
        <View style={{ paddingHorizontal: 16, gap: 12 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 4 }}>Ils nous font confiance</Text>
          <Testi quote="J'ai triplé mes gains en 2 semaines." author="Amine" />
          <Testi quote="Les ressources sont claires et orientées résultats." author="Sarah" />
          <Testi quote="La boutique propose exactement ce dont j'avais besoin." author="Yanis" />
        </View>
      </ScrollView>
      <SiteFooter />
    </View>
  );
}

function Testi({ quote, author }: { quote: string; author: string }) {
  return (
    <View style={{ backgroundColor: '#111827', padding: 14, borderRadius: 12 }}>
      <Text style={{ color: '#E5E7EB', fontStyle: 'italic' }}>
        “{quote}”
      </Text>
      <Text style={{ color: '#9CA3AF', marginTop: 6 }}>— {author}</Text>
    </View>
  );
}
