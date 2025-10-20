import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth, firebaseDb } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { computeLevelFromPoints } from '../../lib/rewards';

export default function StatsScreen() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ pointsBalance: number; completedOffersCount: number; lifetimeEarnings: number } | null>(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        setStats(null);
        setLoading(false);
        return;
      }
      const userDocRef = doc(firebaseDb, 'users', user.uid);
      const unsubDoc = onSnapshot(userDocRef, (snap) => {
        const data = snap.data() as any;
        setStats({
          pointsBalance: data?.pointsBalance ?? 0,
          completedOffersCount: data?.completedOffersCount ?? 0,
          lifetimeEarnings: data?.lifetimeEarnings ?? 0,
        });
        setLoading(false);
      });
      return () => unsubDoc();
    });
    return () => unsubAuth();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;
  if (!stats) return <Text style={{ color: 'white', padding: 16 }}>Connectez-vous pour voir vos statistiques.</Text>;

  const level = computeLevelFromPoints(stats.pointsBalance);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#0b1220' }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Statistiques</Text>
      <Stat label="Points" value={stats.pointsBalance.toFixed(0)} />
      <Stat label="Offres complétées" value={String(stats.completedOffersCount)} />
      <Stat label="Gains cumulés ($)" value={stats.lifetimeEarnings.toFixed(2)} />
      <Stat label="Niveau" value={String(level)} />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ backgroundColor: '#111827', padding: 14, borderRadius: 12, marginBottom: 10 }}>
      <Text style={{ color: '#9CA3AF', fontSize: 12 }}>{label}</Text>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{value}</Text>
    </View>
  );
}
