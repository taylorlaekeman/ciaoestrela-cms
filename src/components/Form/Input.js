import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  color: ${(props) => props.theme.colours.text.label};
  font-size: 0.9rem;
  grid-area: ${(props) => props.area};
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  border: solid ${(props) => props.theme.colours.border.normal} 1px;
  border-radius: 4px;
  color: ${(props) => props.theme.colours.text.body};
  font-size: 1rem;
  grid-area: ${(props) => props.area};
  padding: 8px 16px;
`;

const Input = ({ areas, name, onChange, type, value }) => (
  <>
    <Label area={areas[0]} htmlFor={name}>{name}</Label>
    <StyledInput
      area={areas[1]}
      id={name}
      onChange={(event) => onChange(event.target.value)}
      type={type}
      value={value}
    />
  </>
);

Input.defaultProps = {
  areas: [],
  type: 'text',
};

export default Input;
