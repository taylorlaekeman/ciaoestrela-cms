import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Link from 'components/Link';
import PinDetails from 'components/PinDetails';
import PinList from 'components/PinList';

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colours.background.footer};
  padding: 16px;
`;

const Header = styled.header`
  padding 32px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0;
`;

const Wrapper = styled.article`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

const Listings = () => (
  <Switch>
    <Route path="/listings/pins/:id">
      <PinDetails />
    </Route>
    <Route path="/listings">
      <Wrapper>
        <Header>
          <Title>Pins</Title>
        </Header>
        <PinList />
        <Footer>
          <Link button to="/listings/pins/new">
            Create pin
          </Link>
        </Footer>
      </Wrapper>
    </Route>
  </Switch>
);

export default Listings;
