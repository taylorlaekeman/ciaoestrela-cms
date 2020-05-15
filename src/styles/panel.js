import { css } from 'styled-components';

export default css`
  background-color: ${(props) => props.theme.colours.background.panel};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  padding: 16px;
`;
