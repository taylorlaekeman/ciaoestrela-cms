import React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const buttonStyles = css`
  ${(props) => props.theme.components.button.primary}
  padding: 16px;
`;

const linkStyles = css`
  display: inline-block;
  color: ${(props) => props.theme.colours.text.body};
  width: 100%;
`;

const Link = styled(({ className, children, to }) => (
  <UnstyledLink className={className} to={to}>
    {children}
  </UnstyledLink>
))`
  ${(props) => (props.button ? buttonStyles : linkStyles)}
  grid-area: ${(props) => props.area};
  ${({ button, plain }) => (button || plain ? 'text-decoration: none;' : '')}
`;

export default Link;
