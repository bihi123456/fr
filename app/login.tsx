import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth } from '../lib/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function onLogin() {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
      router.replace('/(tabs)');
    } catch (e: any) {
      Alert.alert('Erreur de connexion', e.message || 'Vérifiez vos identifiants.');
    }
  }

  async function onGoogle() {
    try {
      if (typeof window !== 'undefined') {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(firebaseAuth, provider);
        router.replace('/(tabs)');
      } else {
        Alert.alert('Non pris en charge', 'Google Sign-In natif à configurer');
      }
    } catch (e: any) {
      Alert.alert('Erreur', e.message || 'Impossible de se connecter');
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#0b1220' }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 16 }}>Bienvenue</Text>
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field label="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
      <Pressable onPress={onLogin} style={{ backgroundColor: '#10B981', padding: 14, borderRadius: 10, marginTop: 8 }}>
        <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}>Se connecter</Text>
      </Pressable>
      <Pressable onPress={onGoogle} style={{ backgroundColor: '#1F2937', padding: 14, borderRadius: 10, marginTop: 8 }}>
        <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}>Continuer avec Google</Text>
      </Pressable>
      <Text style={{ color: '#9CA3AF', marginTop: 12 }}>Pas de compte ? <Link href="/signup">Inscription</Link></Text>
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
