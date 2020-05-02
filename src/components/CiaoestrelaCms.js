import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/Header';
import { actions as authActions, selectors as authSelectors } from 'state/auth';
import { actions as orderActions } from 'state/orders';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
`;

const CiaoestrelaCms = () => {
  const { authState, authService } = useOktaAuth();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const token = useSelector(authSelectors.selectToken);

  useEffect(() => {
    dispatch(authActions.saveToken(authState.accessToken));
  }, [dispatch, authState.accessToken]);

  useEffect(() => {
    if (token) dispatch(orderActions.fetchOrders());
  }, [dispatch, token]);

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
    </Wrapper>
  );
};

export default CiaoestrelaCms;
