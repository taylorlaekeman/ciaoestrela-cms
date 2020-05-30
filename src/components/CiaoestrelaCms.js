import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/Header';
import Home from 'components/Home';
import Listings from 'components/Listings';
import LoadingIndicator from 'components/LoadingIndicator';
import Login from 'components/Login';
import OrderPanel from 'components/OrderPanel';
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
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.saveToken(authState.accessToken));
  }, [dispatch, authState.accessToken]);

  if (authState.isPending)
    return (
      <Wrapper>
        <Header />
        <Main>
          <LoadingIndicator centered large />
        </Main>
      </Wrapper>
    );

  if (!authState.isAuthenticated)
    return (
      <Wrapper>
        <Main>
          <Login />
        </Main>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Header />
      <Main>
        <Switch>
          <Route path="/orders">
            <OrderPanel />
          </Route>
          <Route path="/listings">
            <Listings />
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
