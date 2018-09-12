import React from 'react';
import {
  View, TextInput, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './Field.sass';

/**
  * Field Component
  */
const Field = (props) => {
  const { name, value, handleChange } = props;

  /**
    * render
    * @return {ReactElement} markup
    */
  return (
    <View>
      <Text style={styles.label}>{name}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={newValue => handleChange({ name, value: newValue })}
      />
    </View>
  );
};

Field.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

Field.defaultProps = {
  name: '',
  value: '',
  handleChange: () => {},
};

export default Field;
