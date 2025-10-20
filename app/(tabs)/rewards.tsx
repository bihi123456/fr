import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../lib/firebase';
import { requestRedeem } from '../../lib/api';

export default function RewardsScreen() {
  const [amount, setAmount] = useState('5');
  const [method, setMethod] = useState<'paypal' | 'giftcard' | 'crypto'>('paypal');
  const [account, setAccount] = useState('');
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => setUid(user?.uid ?? null));
    return () => unsub();
  }, []);

  function onRedeem() {
    if (!uid) {
      Alert.alert('Connexion requise', 'Veuillez vous connecter.');
      return;
    }
    const amountNum = Number(amount);
    if (!amountNum || amountNum < 1) {
      Alert.alert('Montant invalide', 'Entrez un montant valide.');
      return;
    }
    requestRedeem({ uid, method, amount: amountNum, account }).then(() => {
      Alert.alert('Demande envoyée', 'Votre demande de retrait a été envoyée.');
      setAccount('');
    }).catch((e) => Alert.alert('Erreur', e?.message ?? 'Échec de la demande'));
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#0b1220' }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Récompenses</Text>
      <Field label="Méthode (paypal | giftcard | crypto)" value={method} onChangeText={(t) => setMethod((t as any) || 'paypal')} />
      <Field label="Montant (USD)" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <Field label="Compte/Email/Adresse" value={account} onChangeText={setAccount} />

      <Pressable onPress={onRedeem} style={{ backgroundColor: '#10B981', padding: 14, borderRadius: 10, marginTop: 12 }}>
        <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}>Demander un retrait</Text>
      </Pressable>
    </View>
  );
}

function Field(props: any) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: '#9CA3AF', fontSize: 12, marginBottom: 4 }}>{props.label}</Text>
      <TextInput {...props} placeholderTextColor="#999" style={{ backgroundColor: '#111827', color: 'white', padding: 12, borderRadius: 8 }} />
    </View>
  );
}
