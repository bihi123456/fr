import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth, firebaseDb } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function generateReferralCode(uid: string): string {
  return uid.slice(-6).toUpperCase();
}

export default function ReferralsScreen() {
  const [uid, setUid] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) { setUid(null); return; }
      setUid(user.uid);
      const ref = doc(firebaseDb, 'users', user.uid);
      const snap = await getDoc(ref);
      const existing = snap.data()?.referralCode as string | undefined;
      const c = existing || generateReferralCode(user.uid);
      if (!existing) { await setDoc(ref, { referralCode: c }, { merge: true }); }
      setCode(c);
    });
    return () => unsub();
  }, []);

  const shareUrl = useMemo(() => `https://example.com/?ref=${code}`, [code]);

  async function copy(text: string) {
    await Clipboard.setStringAsync(text);
  }

  if (!uid) return <Text style={{ color: 'white', padding: 16 }}>Connectez-vous pour voir votre code de parrainage.</Text>;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#0b1220' }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Parrainage</Text>
      <Card title="Votre code" value={code} onCopy={() => copy(code)} />
      <Card title="Lien de partage" value={shareUrl} onCopy={() => copy(shareUrl)} />
      <Text style={{ color: '#9CA3AF', marginTop: 10 }}>Gagnez un pourcentage des gains de vos filleuls.</Text>
    </View>
  );
}

function Card({ title, value, onCopy }: { title: string; value: string; onCopy: () => void }) {
  return (
    <View style={{ backgroundColor: '#111827', padding: 14, borderRadius: 12, marginBottom: 10 }}>
      <Text style={{ color: '#9CA3AF', fontSize: 12 }}>{title}</Text>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginVertical: 6 }}>{value}</Text>
      <Pressable onPress={onCopy} style={{ alignSelf: 'flex-start', backgroundColor: '#1F2937', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
        <Text style={{ color: 'white' }}>Copier</Text>
      </Pressable>
    </View>
  );
}
