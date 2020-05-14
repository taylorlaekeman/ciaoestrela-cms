import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import UnstyledLink from 'components/Link';
import Panel from 'components/Panel';
import PinList from 'components/PinList';
import { selectors as authSelectors } from 'state/auth';
import { actions as pinActions, selectors as pinSelectors } from 'state/pins';

const Footer = styled.footer`
  margin-top: 32px;
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

const Link = styled(UnstyledLink)`
  margin: -32px;
  padding: 32px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0;
`;

const Listings = () => {
  const dispatch = useDispatch();
  const pins = useSelector(pinSelectors.selectPins);
  const token = useSelector(authSelectors.selectToken);

  useEffect(() => {
    if (token) dispatch(pinActions.fetchPins());
  }, [dispatch, token]);

  return (
    <Panel>
      <Header>
        <Title>Pins</Title>
      </Header>
      <PinList pins={Object.values(pins)} />
      <Footer>
        <Link to="/listings/pins/new">Create pin</Link>
      </Footer>
    </Panel>
  );
};

export default Listings;
