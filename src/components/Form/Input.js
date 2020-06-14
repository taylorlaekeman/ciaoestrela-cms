import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import Error from './Error';

const Label = styled.label`
  color: ${({ hasVisibleError, theme }) =>
    hasVisibleError ? theme.colours.text.error : theme.colours.text.label};
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  border: solid
    ${({ hasVisibleError, theme }) =>
      hasVisibleError
        ? theme.colours.border.error
        : theme.colours.border.normal}
    1px;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${({ hasVisibleError, theme }) =>
    hasVisibleError ? theme.colours.text.error : theme.colours.text.body};
  font-size: 1rem;
  padding: 8px 16px;
  width: 100%;
`;

const Wrapper = styled.section`
  grid-area: ${(props) => props.area};
  margin-bottom: 16px;
`;

const Input = ({
  area,
  className,
  error,
  hasSubmitted,
  name,
  onChange,
  type,
  value,
}) => {
  const [isDirty, setIsDirty] = useState(false);

  const hasVisibleError = (hasSubmitted || isDirty) && error;

  return (
    <Wrapper area={area} className={className}>
      <Label hasVisibleError={hasVisibleError} htmlFor={name}>
        {name}
      </Label>
      <StyledInput
        hasVisibleError={hasVisibleError}
        id={name}
        onBlur={() => setIsDirty(true)}
        onChange={(event) => {
          setIsDirty(true);
          onChange(event.target.value);
        }}
        type={type}
        value={value}
      />
      {hasVisibleError && <Error htmlFor={name}>{error}</Error>}
    </Wrapper>
  );
};

Input.defaultProps = {
  area: '',
  className: '',
  error: false,
  hasSubmitted: false,
  onChange: () => {},
  type: 'text',
  value: '',
};

Input.propTypes = {
  area: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hasSubmitted: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
