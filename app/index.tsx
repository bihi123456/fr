import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../lib/firebase';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      setIsAuthed(!!user);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  if (isLoading) return null;
  return <Redirect href={isAuthed ? '/(tabs)' : '/login'} />;
}
