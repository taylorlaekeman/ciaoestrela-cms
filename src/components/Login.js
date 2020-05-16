import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Button from 'components/Button';

const Article = styled.article`
  margin-bottom: 128px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colours.text.subtitle};
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  margin: 0;
  margin-bottom: 32px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colours.text.body};
  font-size: 2rem;
  font-weight: 300;
  margin: 0;
  margin-bottom: 8px;
`;

const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colours.background.panel};
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 0 32px;
`;

const Login = () => {
  const { authService } = useOktaAuth();
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <Article>
        <Title>Ciao, Estrela Co.</Title>
        <Subtitle>Admin panel</Subtitle>
        <Button onClick={() => authService.login(pathname)}>Login</Button>
      </Article>
    </Wrapper>
  );
};

export default Login;
