import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(UnstyledLink)`
  display: inline-block;
  color: ${(props) => props.theme.colours.text.body};
  text-decoration: none;
  width: 100%;
`;

export default Link;
