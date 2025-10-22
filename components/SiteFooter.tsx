import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function SiteFooter() {
  return (
    <View style={{ backgroundColor: '#0b1220', borderTopWidth: 1, borderTopColor: '#111827', paddingHorizontal: 16, paddingVertical: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <View style={{ maxWidth: 480 }}>
          <Text style={{ color: 'white', fontWeight: '800', fontSize: 18, marginBottom: 6 }}>CPA Pro</Text>
          <Text style={{ color: '#9CA3AF' }}>Gagnez de l'argent avec le CPA et accédez à des ressources exclusives.</Text>
        </View>
        <View style={{ gap: 8 }}>
          <FooterLink href="/about" label="À propos" />
          <FooterLink href="/blog" label="Blog" />
          <FooterLink href="/shop" label="Boutique" />
          <FooterLink href="/contact" label="Contact" />
          <FooterLink href="/legal" label="Mentions légales" />
        </View>
        <View style={{ gap: 8 }}>
          <FooterExternal label="Twitter" />
          <FooterExternal label="Instagram" />
          <FooterExternal label="YouTube" />
        </View>
      </View>
      <Text style={{ color: '#6B7280', marginTop: 12 }}>© {new Date().getFullYear()} CPA Pro. Tous droits réservés.</Text>
    </View>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <Text style={{ color: '#E5E7EB' }}>{label}</Text>
      </Pressable>
    </Link>
  );
}

function FooterExternal({ label }: { label: string }) {
  return (
    <Pressable>
      <Text style={{ color: '#E5E7EB' }}>{label}</Text>
    </Pressable>
  );
}
