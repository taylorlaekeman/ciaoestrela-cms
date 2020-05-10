import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Error from './Error';

const Label = styled.label`
  color: ${(props) =>
    props.error
      ? props.theme.colours.text.error
      : props.theme.colours.text.label};
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  border: solid
    ${(props) =>
      props.error
        ? props.theme.colours.border.error
        : props.theme.colours.border.normal}
    1px;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${(props) =>
    props.error
      ? props.theme.colours.text.error
      : props.theme.colours.text.body};
  font-size: 1rem;
  padding: 8px 16px;
  width: 100%;
`;

const Wrapper = styled.section`
  grid-area: ${(props) => props.area};
`;

const Input = ({
  area,
  className,
  error,
  name,
  onBlur,
  onChange,
  type,
  value,
}) => (
  <Wrapper area={area} className={className}>
    <Label error={error} htmlFor={name}>
      {name}
    </Label>
    <StyledInput
      error={error}
      id={name}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      type={type}
      value={value}
    />
    {error && <Error htmlFor={error}>{error}</Error>}
  </Wrapper>
);

Input.defaultProps = {
  area: '',
  className: '',
  error: false,
  onBlur: () => {},
  onChange: () => {},
  type: 'text',
  value: '',
};

Input.propTypes = {
  area: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
