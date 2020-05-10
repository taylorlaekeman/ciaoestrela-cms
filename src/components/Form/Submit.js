import styled from 'styled-components';

const addProps = () => ({ type: 'submit' });

const Submit = styled.button.attrs(addProps)`
  background-color: ${(props) => props.theme.colours.background.primaryButton};
  border: solid ${(props) => props.theme.colours.border.primaryButton} 1px;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${(props) => props.theme.colours.text.body};
  font-size: 1rem;
  grid-area: ${(props) => props.area};
  padding: 8px 16px;
  text-align: left;
  width: 100%;
  -webkit-appearance: none;
`;

export default Submit;
