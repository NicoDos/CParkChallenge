import React from 'react';
import {
  View, TouchableOpacity, Text, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './ReportsList.sass';

// TODO: Read this from config file
const localIP = '192.168.1.16';

/**
  * Reports list page Component
  */
class ReportsList extends React.Component {
  /**
    * constructor
    * @param {object} props
    */
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      sortBy: 'time',
      sorted: false,
    };
  }

  /**
   * Retrieve data from API when component has mounted
   */
  componentDidMount() {
    axios.get(`http://${localIP}:8080/report/4/5`)
      .then((res) => {
        this.setState({
          reports: res.data,
        });
      })
      .catch(() => {
        // TODO: Handle error
      });
  }

  /**
   * Sort the reports list
   * @param {string} column
   */
  sortList = (column) => {
    const { reports, sortBy, sorted } = this.state;

    if (sortBy === column) {
      reports.reverse();
    } else {
      this.setState({ sortBy: column });
      reports.sort((a, b) => a[column] > b[column]);
    }

    this.setState({
      reports,
      sorted: !sorted,
    });
  }

  /**
   * Render the list rows
   * @param {object} item
   */
  renderRow = item => (
    <View style={styles.listItem}>
      <Text>{item.title}</Text>
      <Text>{item.dateCreated}</Text>
      <Text>{item.distance}</Text>
    </View>
  );

  /**
   * Render the list separators
   */
  renderSeparator = () => (
    <View style={styles.separator} />
  );

  /**
   * Render the list header
   */
  renderHeader = () => {
    const { navigation } = this.props;

    return (
      <View style={styles.listHeader}>
        <TouchableOpacity onPress={() => this.sortList('dateCreated')}>
          <Text style={[styles.button, this.activeClassName('dateCreated')]}>Time</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.sortList('distance')}>
          <Text style={[styles.button, this.activeClassName('distance')]}>Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Report')} style={styles.buttonAdd}>
          <Text style={[styles.button, styles.buttonAddText]}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Return a style active when accurate
   * @param {string} column
   */
  activeClassName = (column) => {
    const { sortBy } = this.state;
    return sortBy === column ? styles.active : '';
  };

  /**
    * render
    * @return {ReactElement} markup
    */
  render() {
    const { reports, sorted } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Reports list</Text>
        <FlatList
          style={styles.list}
          data={reports}
          extraData={sorted}
          renderItem={({ item }) => this.renderRow(item)}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

ReportsList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

ReportsList.defaultProps = {
  navigation: {
    navigate: () => {},
  },
};

export default ReportsList;
