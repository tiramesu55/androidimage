import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageGestures from './src/imageGestures';
export default function App() {
  return (
    <View style={styles.container}>

      <ImageGestures />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
