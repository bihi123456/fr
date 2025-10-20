import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDb } from '../lib/firebase';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const params = useLocalSearchParams();

  async function onSignup() {
    try {
      const cred = await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
      const ref = doc(firebaseDb, 'users', cred.user.uid);
      const referredBy = typeof params.ref === 'string' ? params.ref : undefined;
      await setDoc(ref, { pointsBalance: 0, completedOffersCount: 0, lifetimeEarnings: 0, referredBy }, { merge: true });
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Erreur', e.message || "Impossible de créer le compte");
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#0b1220' }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 16 }}>Créer un compte</Text>
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field label="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
      <Pressable onPress={onSignup} style={{ backgroundColor: '#2563EB', padding: 14, borderRadius: 10, marginTop: 8 }}>
        <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}>Inscription</Text>
      </Pressable>
      <Text style={{ color: '#9CA3AF', marginTop: 12 }}>Déjà un compte ? <Link href="/login">Connexion</Link></Text>
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
