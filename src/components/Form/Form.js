import PropTypes from 'prop-types';
import React from 'react';

const Form = ({ children, className, onSubmit }) => (
  <form
    action="#"
    className={className}
    noValidate
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit(event);
    }}
  >
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  children: null,
  className: '',
  onSubmit: () => {},
};

export default Form;
