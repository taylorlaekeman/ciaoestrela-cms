import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Link from 'components/Link';
import PinList from 'components/PinList';
import { selectors as authSelectors } from 'state/auth';
import { actions as pinActions, selectors as pinSelectors } from 'state/pins';

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colours.background.footer};
  padding: 16px;
`;

const Header = styled.header`
  padding 32px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0;
`;

const Wrapper = styled.article`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

const Listings = () => {
  const dispatch = useDispatch();
  const pins = useSelector(pinSelectors.selectPins);
  const token = useSelector(authSelectors.selectToken);

  useEffect(() => {
    if (token) dispatch(pinActions.fetchPins());
  }, [dispatch, token]);

  return (
    <Wrapper>
      <Header>
        <Title>Pins</Title>
      </Header>
      <PinList pins={Object.values(pins)} />
      <Footer>
        <Link button to="/listings/pins/new">
          Create pin
        </Link>
      </Footer>
    </Wrapper>
  );
};

export default Listings;
