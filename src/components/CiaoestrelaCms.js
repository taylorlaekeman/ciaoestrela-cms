import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/Header';
import {
  actions as orderActions,
  selectors as orderSelectors,
} from 'state/orders';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
`;

const CiaoestrelaCms = () => {
  const { authState, authService } = useOktaAuth();
  const getDispatch = useDispatch();
  const isFetchingOrders = useSelector(orderSelectors.isFetchingOrders);
  const { pathname } = useLocation();

  useEffect(() => {
    getDispatch((dispatch) => {
      dispatch(orderActions.fetchOrders());
    });
  }, [getDispatch]);

  if (authState.isPending) return <div>loading...</div>;

  if (!authState.isAuthenticated)
    return (
      <button type="button" onClick={() => authService.login(pathname)}>
        login
      </button>
    );

  console.log({ isFetchingOrders });
  console.log(authState.accessToken);

  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

export default CiaoestrelaCms;
