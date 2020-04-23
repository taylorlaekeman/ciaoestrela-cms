import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/Header';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
`;

const CiaoestrelaCms = () => {
  const { authState, authService } = useOktaAuth();
  const { pathname } = useLocation();

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
