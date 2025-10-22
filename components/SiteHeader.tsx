import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { Link, useRouter, useSegments } from 'expo-router';

export default function SiteHeader() {
  const router = useRouter();
  const segments = useSegments();
  const inShop = segments[0] === 'shop';

  return (
    <View style={{ backgroundColor: '#0b1220', borderBottomWidth: 1, borderBottomColor: '#111827' }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" asChild>
          <Pressable>
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 18 }}>CPA Pro</Text>
          </Pressable>
        </Link>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <NavLink href="/about" label="À propos" />
          <NavLink href="/blog" label="Blog" />
          <NavLink href="/shop" label="Boutique" />
          <NavLink href="/contact" label="Contact" />
          <Link href="/login" asChild>
            <Pressable style={{ backgroundColor: '#2563EB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Connexion / Inscription</Text>
            </Pressable>
          </Link>
          <Link href="/cart" asChild>
            <Pressable style={{ backgroundColor: '#1F2937', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Panier</Text>
            </Pressable>
          </Link>
        </View>
      </View>
      {inShop ? (
        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <TextInput placeholder="Rechercher dans la boutique" placeholderTextColor="#9CA3AF" style={{ backgroundColor: '#111827', color: 'white', padding: 10, borderRadius: 8 }} onSubmitEditing={(e) => router.push(`/shop?search=${encodeURIComponent(e.nativeEvent.text)}`)} />
        </View>
      ) : null}
    </View>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <Text style={{ color: '#E5E7EB', fontWeight: '600' }}>{label}</Text>
      </Pressable>
    </Link>
  );
}
