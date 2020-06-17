import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavList from 'components/NavList';
import NavListItem from 'components/NavListItem';
import Listings from 'views/Listings';
import OrderPanel from 'views/orders/OrderPanel';

const Home = () => (
  <Switch>
    <Route path="/listings">
      <Listings />
    </Route>
    <Route path="/orders">
      <OrderPanel />
    </Route>
    <Route path="/">
      <NavList>
        <NavListItem text="Orders" to="/orders" />
        <NavListItem text="Listings" to="/listings" />
      </NavList>
    </Route>
  </Switch>
);

export default Home;
