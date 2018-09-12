import React from 'react';
import {
  View, TouchableOpacity, Text, FlatList, RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import getCurrentPosition from '../utils/coordinates';

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
      isFetching: false,
      reports: [],
      sortBy: 'time',
      sorted: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  /**
   * When component has mounted
   */
  componentDidMount() {
    this.getDataFromApi();
  }

  /**
    * Refresh data when pulling down
    * Update value in state
    */
  onRefresh() {
    this.setState({ isFetching: true }, () => {
      this.getDataFromApi();
    });
  }

  /**
   * Retrieve data from API when component has mounted
   */
  getDataFromApi = () => {
    getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;

        axios.get(`http://${localIP}:8080/report/${latitude}/${longitude}`)
          .then((res) => {
            this.setState({
              isFetching: false,
              reports: res.data,
            });
          })
          .catch(error => this.setState(error));
      })
      .catch(error => this.setState(error));
  };

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
  };

  /**
   * Render the list rows
   * @param {object} item
   */
  renderRow = (item) => {
    const dateFormatted = moment(item.time).format('DD/MM/YYYY - HH:mm');
    const distanceFormatted = `${(item.distance / 1000).toFixed(2)} Km away`;

    return (
      <View style={styles.listItem}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.info}>
          <Text>{dateFormatted}</Text>
          <Text>{distanceFormatted}</Text>
        </View>
      </View>
    );
  };

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
        <TouchableOpacity onPress={() => this.sortList('time')}>
          <Text style={[styles.button, this.activeClassName('time')]}>Time</Text>
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
    const { reports, sorted, isFetching } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Reports list</Text>
        <FlatList
          style={styles.list}
          data={reports}
          extraData={sorted}
          refreshControl={(
            <RefreshControl
              refreshing={isFetching}
              onRefresh={this.onRefresh}
            />
          )}
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
