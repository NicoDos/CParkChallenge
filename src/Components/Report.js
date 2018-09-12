import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import getCurrentPosition from '../utils/coordinates';
import Form from './Form';

import styles from './Report.sass';

// TODO: Read this from config file
const localIP = '192.168.1.16';
const loginDetails = {
  email: 'nico@cpark.com',
  password: 'super_secret',
};

/**
  * Reports list page Component
  */
class Report extends React.Component {
  /**
    * constructor
    * @param {object} props
    */
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      form: {
        title: '',
      },
      formStatus: '',
      token: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
  }

  /**
    * Get geolocalisation of user
    * Update value in state
    */
  componentDidMount() {
    this.login();
    getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;

        this.setState({ latitude, longitude });
      })
      .catch(error => this.setState(error));
  }

  login() {
    axios.post(`http://${localIP}:8080/login`, loginDetails)
      .then((res) => {
        const { token } = res.data;
        this.setState({ token });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
    * Handle change of inputs
    * Update value in state
    * @param {object} textInput
    */
  handleChange(textInput) {
    const { name, value } = textInput;
    const { form } = this.state;
    form[name] = value;

    this.setState({ form });
  }

  /**
    * Handle submit of form
    * Send data to API
    */
  handleSubmit() {
    const { latitude, longitude, token } = this.state;
    const { form } = this.state;
    const { title } = form;
    const data = {
      token,
      title,
      position: [latitude, longitude],
    };

    axios.post(`http://${localIP}:8080/report`, data)
      .then((res) => {
        this.setState({
          formStatus: res.data,
        });
      })
      .catch((res) => {
        this.setState({
          formStatus: res.data,
        });
      });
  }

  /**
    * render
    * @return {ReactElement} markup
    */
  render() {
    const { form, formStatus } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Report</Text>
        <Text>{formStatus}</Text>
        <Form
          fields={form}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}

export default Report;
