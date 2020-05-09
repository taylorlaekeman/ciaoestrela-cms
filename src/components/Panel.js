import styled from 'styled-components';

const Panel = styled.article`
  background-color: ${(props) => props.theme.colours.background.panel};
  border-radius: 4px;
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  padding: 32px 32px;
`;

export default Panel;
