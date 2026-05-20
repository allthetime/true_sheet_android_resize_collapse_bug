import React, { useRef, useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { TrueSheet } from '@lodev09/react-native-true-sheet';

export default function MinimalRepro() {
  const sheetRef = useRef<TrueSheet>(null);
  const [mode, setMode] = useState<'A' | 'B'>('A');

  // Trigger resize when mode changes
  useEffect(() => {
    if (mode === 'A') {
      sheetRef.current?.resize(0);
    } else {
      sheetRef.current?.resize(1); // Resize to detent index 1 (50%)
    }
  }, [mode]);

  return (
    <View style={styles.container}>
      <Button title="Resize to Detent 1 (50%)" onPress={() => setMode('B')} />
      <Button title="Detent 0" onPress={() => setMode('A')} />

      <TrueSheet
        ref={sheetRef}
        detents={[0.1, 0.5, 1]} // Use numeric detent 0
        initialDetentIndex={0}
        dimmed={false}
        dismissible={false}
      >
        {/* Swapping content triggers a layout pass mid-transition */}
        {mode === 'A' ? (
          <View style={[styles.content, { height: 100 }]}>
            <Text>:)</Text>
          </View>
        ) : (
          <View style={[styles.content, { height: 300 }]}>
            <Text>:(</Text>
          </View>
        )}
      </TrueSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 60,
  },
});
