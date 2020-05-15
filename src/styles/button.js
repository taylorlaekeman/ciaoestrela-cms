import { css } from 'styled-components';

const primary = css`
  background-color: ${(props) => props.theme.colours.background.buttonPrimary};
  border: solid ${(props) => props.theme.colours.border.buttonPrimary} 1px;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${(props) => props.theme.colours.text.buttonPrimary};
  display: block;
  font-size: 1rem;
  grid-area: ${(props) => props.area};
  padding: 8px 16px;
  text-align: left;
  width: 100%;
  -webkit-appearance: none;
`;

export default {
  primary,
};
