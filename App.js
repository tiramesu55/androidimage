import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
//import ImageGestures from './src/imageGestures';
//import ImageMapperTest from './src/reactImageMapper';
import SimplaImage from './src/SimpleImage'
export default function App() {
  return (
    <View style={styles.container}>

      <SimplaImage />
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
