import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  align-items: baseline;
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

const Header = () => (
  <Container>
    <Title>Ciao, Estrela Co.</Title>
    <Description>Admin panel</Description>
  </Container>
);

export default Header;
