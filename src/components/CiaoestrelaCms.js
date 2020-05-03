import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/Header';
import OrderPanel from 'components/OrderPanel';
import { actions as authActions } from 'state/auth';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colours.page.background};
  box-sizing: border-box;
  height: 100%;
  min-height: 100vh;
  padding-bottom: 10px;
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
      <button type="button" onClick={() => authService.logout()}>
        logout
      </button>
      <OrderPanel />
    </Wrapper>
  );
};

export default CiaoestrelaCms;
