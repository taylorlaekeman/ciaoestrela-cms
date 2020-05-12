import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import UnstyledLink from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import Panel from 'components/Panel';
import Pin from 'components/Pin';
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

const Pins = styled.ul`
  list-style: none;
  margin: 0;
  max-height: 300px;
  overflow: scroll;
  padding: 0;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0;
`;

const Listings = () => {
  const dispatch = useDispatch();
  const isFetchingPins = useSelector(pinSelectors.isFetchingPins);
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
      {isFetchingPins ? (
        <LoadingIndicator large="true" />
      ) : (
        <Pins>
          {Object.values(pins).map((pin) => (
            <Pin key={pin.id} pin={pin} />
          ))}
        </Pins>
      )}
      <Footer>
        <Link to="/listings/pins/new">Add pin</Link>
      </Footer>
    </Panel>
  );
};

export default Listings;
