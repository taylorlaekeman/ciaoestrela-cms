import React from 'react';
import styled from 'styled-components';

import UnstyledLink from 'components/Link';
import Panel from 'components/Panel';

const Footer = styled.footer`
  margin-top: 32px;
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

const Link = styled(UnstyledLink)`
  margin: -32px;
  padding: 32px;
  width: 100%;
`;

const Pin = styled.li`
  padding: 8px;
`;

const Pins = styled.ul`
  list-style: none;
  margin: 0;
  max-height: 200px;
  overflow: scroll;
  padding: 0;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0;
`;

const Listings = () => (
  <Panel>
    <Header>
      <Title>Pins</Title>
    </Header>
    <Pins>
      <Pin>test</Pin>
    </Pins>
    <Footer>
      <Link to="/listings/pins/new">Add pin</Link>
    </Footer>
  </Panel>
);

export default Listings;
