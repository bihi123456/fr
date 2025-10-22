import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function onSubmit() {
    if (!name || !email || !message) {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
      return;
    }
    Alert.alert('Message envoyé', 'Nous vous répondrons par email.');
    setMessage('');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <SiteHeader />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 12 }}>Contact</Text>
        <Field label="Nom" value={name} onChangeText={setName} />
        <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Field label="Message" value={message} onChangeText={setMessage} multiline numberOfLines={5} />
        <Pressable onPress={onSubmit} style={{ backgroundColor: '#2563EB', padding: 14, borderRadius: 10, marginTop: 12 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Envoyer</Text>
        </Pressable>
      </ScrollView>
      <SiteFooter />
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
