import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { selectors as authSelectors } from 'state/auth';
import { actions as cardActions } from 'state/cards';
import CardDetails from 'views/cards/CardDetails';
import CardList from 'views/cards/CardList';

const Cards = () => {
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.selectToken);

  useEffect(() => {
    if (token) dispatch(cardActions.fetchCards());
  }, [dispatch, token]);

  return (
    <Switch>
      <Route path="/listings/cards/:id">
        <CardDetails />
      </Route>
      <Route path="/listings/cards">
        <CardList />
      </Route>
    </Switch>
  );
};

export default Cards;
