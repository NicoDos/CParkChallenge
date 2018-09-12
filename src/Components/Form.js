import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './Form.sass';
import Field from './Field';

/**
  * Form Component
  */
const Form = (props) => {
  const { fields, handleChange, handleSubmit } = props;

  /**
    * render
    * @return {ReactElement} markup
    */
  return (
    <View style={styles.form}>
      {Object.keys(fields).map(name => (
        <Field
          key={name}
          name={name}
          value={fields[name].value}
          handleChange={handleChange}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit my report</Text>
      </TouchableOpacity>
    </View>
  );
};

Form.displayName = 'AddReportForm';

Form.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
  }),
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

Form.defaultProps = {
  fields: {
    name: '',
    value: '',
    handleChange: () => {},
  },
  handleChange: () => {},
  handleSubmit: () => {},
};

export default Form;
