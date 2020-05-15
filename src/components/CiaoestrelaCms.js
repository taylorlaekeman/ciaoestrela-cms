import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/Header';
import Home from 'components/Home';
import Listings from 'components/Listings';
import OrderPanel from 'components/OrderPanel';
import PinCreator from 'components/PinCreator';
import { actions as authActions } from 'state/auth';

const Main = styled.main`
  overflow: hidden;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colours.background.page};
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100vw;
`;

const CiaoestrelaCms = () => {
  const { authState, authService } = useOktaAuth();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(authActions.saveToken(authState.accessToken));
  }, [dispatch, authState.accessToken]);

  if (authState.isPending) return <div>loading...</div>;

  if (!authState.isAuthenticated)
    return (
      <button type="button" onClick={() => authService.login(pathname)}>
        login
      </button>
    );

  return (
    <Wrapper>
      <Header />
      <Main>
        <Switch>
          <Route path="/orders">
            <OrderPanel />
          </Route>
          <Route exact path="/listings">
            <Listings />
          </Route>
          <Route path="/listings/pins/new">
            <PinCreator />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
    </Wrapper>
  );
};

export default CiaoestrelaCms;
