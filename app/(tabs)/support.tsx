import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { sendSupportMessage } from '../../lib/api';

export default function SupportScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function onSubmit() {
    if (!email || !message) { Alert.alert('Champs requis', 'Veuillez remplir tous les champs.'); return; }
    sendSupportMessage({ email, message }).then(() => {
      Alert.alert('Envoyé', 'Nous vous répondrons bientôt.');
      setMessage('');
    }).catch((e) => Alert.alert('Erreur', e?.message ?? 'Impossible d\'envoyer'));
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0b1220' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Support & FAQ</Text>
      <View style={{ backgroundColor: '#111827', padding: 14, borderRadius: 12, marginBottom: 12 }}>
        <Text style={{ color: '#9CA3AF', marginBottom: 6 }}>
          Complétez des offres Ogads pour gagner des points convertibles en récompenses. Les paiements sont traités sous 48-72h.
        </Text>
      </View>
      <Text style={{ color: 'white', fontSize: 16, fontWeight: '700', marginBottom: 8 }}>Contactez-nous</Text>
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Field label="Message" value={message} onChangeText={setMessage} multiline numberOfLines={4} />
      <Pressable onPress={onSubmit} style={{ backgroundColor: '#2563EB', padding: 14, borderRadius: 10, marginTop: 12 }}>
        <Text style={{ color: 'white', fontWeight: '700', textAlign: 'center' }}>Envoyer</Text>
      </Pressable>
    </ScrollView>
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
