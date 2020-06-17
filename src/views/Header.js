import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import Link from 'components/Link';

const Container = styled.header`
  align-items: baseline;
  background-color: ${(props) => props.theme.colours.background.header};
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0;
`;

const Header = () => {
  const { authService } = useOktaAuth();
  return (
    <Container>
      <Link plain to="/">
        <Title>Ciao, Estrela Co.</Title>
      </Link>
      <Button onClick={() => authService.logout()} isPlain>
        Logout
      </Button>
    </Container>
  );
};

export default Header;
