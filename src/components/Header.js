import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import styled from 'styled-components';

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

const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
`;

const Header = () => {
  const { authService } = useOktaAuth();
  return (
    <Container>
      <Link to="/">
        <Title>Ciao, Estrela Co.</Title>
      </Link>
      <Description>Admin panel</Description>
      <button type="button" onClick={() => authService.logout()}>
        logout
      </button>
    </Container>
  );
};

export default Header;
