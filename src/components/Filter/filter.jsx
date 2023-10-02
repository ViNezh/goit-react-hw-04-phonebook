import React from 'react';
import PropTypes from 'prop-types';
import css from './filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <label className={css.filterLabel}>
      {'Find contact by name  '}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={css.inputFilter}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
