import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserId, useUserCountry } from '../../lib/hooks';
import { buildOfferwallUrl } from '../../lib/offerwall';

export default function OffersScreen() {
  const insets = useSafeAreaInsets();
  const userId = useUserId();
  const country = useUserCountry();
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const uri = useMemo(() => buildOfferwallUrl({ userId, country, category, difficulty }), [userId, country, category, difficulty]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: 12, paddingBottom: 8, backgroundColor: '#0b1220' }}>
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 20, marginBottom: 8 }}>Offres Ogads</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput placeholder="Catégorie" placeholderTextColor="#999" value={category} onChangeText={setCategory} style={{ flex: 1, backgroundColor: '#111827', color: 'white', padding: 10, borderRadius: 8 }} />
          <TextInput placeholder="Difficulté" placeholderTextColor="#999" value={difficulty} onChangeText={setDifficulty} style={{ flex: 1, backgroundColor: '#111827', color: 'white', padding: 10, borderRadius: 8 }} />
        </View>
      </View>
      <WebView source={{ uri }} style={{ flex: 1 }} setSupportMultipleWindows={false} originWhitelist={["*"]} allowsInlineMediaPlayback mediaPlaybackRequiresUserAction={Platform.OS === 'ios'} />
    </View>
  );
}
