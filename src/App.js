import React from 'react';
import { View } from 'react-native';

import styles from './App.sass';

import ReportsList from './Components/ReportsList';

/**
 * Main App page component
 */
const App = () => (
  <View style={styles.container}>
    <ReportsList />
  </View>
);

export default App;
