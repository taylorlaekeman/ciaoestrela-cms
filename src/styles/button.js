import { css } from 'styled-components';

const plain = css`
  appearance: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colours.text.body};
  cursor: pointer;
  display: block;
  font-size: 1rem;
  grid-area: ${({ area }) => area};
  padding: 8px 16px;
  text-decoration: underline;
`;

const primary = css`
  background-color: ${(props) => props.theme.colours.background.button.primary};
  border: solid ${({ theme }) => theme.colours.border.button.primary} 1px;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colours.text.button.primary};
  display: block;
  font-size: 1rem;
  grid-area: ${(props) => props.area};
  padding: 8px 16px;
  text-align: left;
  width: 100%;
  -webkit-appearance: none;
`;

const secondary = css`
  appearance: none;
  background-color: ${({ theme }) => theme.colours.background.button.secondary};
  border: solid ${({ theme }) => theme.colours.border.button.secondary};
  border-radius: 4px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colours.text.button.secondary};
  display: block;
  font-size: 1rem;
  grid-area: ${({ area }) => area};
  padding: 8px 16px;
  text-align: left;
  width: 100%;
`;

export default {
  plain,
  primary,
  secondary,
};
