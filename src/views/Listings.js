import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavList from 'components/NavList';
import NavListItem from 'components/NavListItem';
import Cards from 'views/cards/Cards';
import Pins from 'views/pins/Pins';

const Listings = () => (
  <Switch>
    <Route path="/listings/cards">
      <Cards />
    </Route>
    <Route path="/listings/pins">
      <Pins />
    </Route>
    <Route path="/listings">
      <NavList>
        <NavListItem text="Cards" to="/listings/cards" />
        <NavListItem text="Pins" to="/listings/pins" />
      </NavList>
    </Route>
  </Switch>
);

export default Listings;
