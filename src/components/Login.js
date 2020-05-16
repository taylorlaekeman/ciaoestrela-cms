import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Button from 'components/Button';

const Wrapper = styled.article`
  align-items: center;
  background-color: ${({ theme }) => theme.colours.background.panel};
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 0 32px;
  /*padding-bottom: 20%;*/
`;

const Login = () => {
  const { authService } = useOktaAuth();
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <Button onClick={() => authService.login(pathname)}>Login</Button>
    </Wrapper>
  );
};

export default Login;
