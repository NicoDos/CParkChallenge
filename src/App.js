import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import './App.sass';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/**
 * Hello from the doc!
 */
const App = () => (
  <View style={styles.container}>
    <Text>CPark Challenge</Text>
  </View>
);

export default App;
