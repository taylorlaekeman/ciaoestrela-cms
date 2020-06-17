import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import { actions as authActions } from 'state/auth';
import Header from 'views/Header';
import Home from 'views/Home';
import Login from 'views/Login';

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
        <Home />
      </Main>
    </Wrapper>
  );
};

export default CiaoestrelaCms;
