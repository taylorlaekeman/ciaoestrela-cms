import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  grid-area: ${({ area }) => area};
`;

const Form = ({ area, children, className, onSubmit }) => (
  <StyledForm
    action="#"
    area={area}
    className={className}
    noValidate
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit(event);
    }}
  >
    {children}
  </StyledForm>
);

Form.defaultProps = {
  area: '',
  children: null,
  className: '',
  onSubmit: () => {},
};

Form.propTypes = {
  area: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
