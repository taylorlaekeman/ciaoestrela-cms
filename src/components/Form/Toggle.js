import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const addAttrs = () => ({ type: 'checkbox' });

const Checkbox = styled.input.attrs(addAttrs)`
  appearance: none;
  display: inline;
  height: 0;
  opacity: 0;
  width: 0;
`;

const Label = styled.label`
  background-color: ${({ theme, value }) =>
    value
      ? theme.colours.background.toggle.on
      : theme.colours.background.toggle.off};
  border-radius: 16px;
  display: inline-block;
  height: 16px;
  position: relative;
  width: 32px;

  &:after {
    ${({ value }) => (value ? 'right' : 'left')}: 0;
    background-color: ${({ theme, value }) =>
      value ? theme.colours.fill.toggle.on : theme.colours.fill.toggle.off};
    border: solid
      ${({ theme, value }) =>
        value
          ? theme.colours.border.toggle.on
          : theme.colours.border.toggle.off}
      1px;
    border-radius: 50%;
    box-sizing: border-box;
    content: '';
    display: block;
    height: 24px;
    right: 0;
    margin: -4px;
    position: absolute;
    top: 0;
    width: 24px;
  }
`;

const Wrapper = styled.div`
  grid-area: ${({ area }) => area};
  height: 16px;
`;

const Toggle = ({ area, className, name, onChange, value }) => (
  <Wrapper area={area} className={className}>
    <Checkbox checked={value} id={name} onChange={() => onChange(!value)} />
    <Label htmlFor={name} value={value} />
  </Wrapper>
);

Toggle.defaultProps = {
  area: '',
  className: '',
  onChange: () => {},
  value: false,
};

Toggle.propTypes = {
  area: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
};

export default Toggle;
