import { createBottomTabNavigator } from 'react-navigation';

import Report from './Components/Report';
import ReportsList from './Components/ReportsList';

import styles from './App.sass';

const BottomTabNavigatorConfig = {
  tabBarOptions: {
    showIcon: false,
    tabStyle: styles.tab,
    labelStyle: styles.tabLabel,
  },
};

/**
 * Main App page component
 */
const App = createBottomTabNavigator({
  ReportsList: { screen: ReportsList },
  Report: { screen: Report },
}, BottomTabNavigatorConfig);

export default App;
