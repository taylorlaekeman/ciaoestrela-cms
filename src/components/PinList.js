import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import Pin from 'components/Pin';
import { selectors as authSelectors } from 'state/auth';
import { actions as pinActions, selectors as pinSelectors } from 'state/pins';

const CenteringWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Pins = styled.ul`
  list-style: none;
  margin: 0;
  overflow: scroll;
  padding: 0 16px;
`;

const PinList = () => {
  const dispatch = useDispatch();
  const isFetchingPins = useSelector(pinSelectors.isFetchingPins);
  const pins = useSelector(pinSelectors.selectPins);
  const token = useSelector(authSelectors.selectToken);

  useEffect(() => {
    if (token) dispatch(pinActions.fetchPins());
  }, [dispatch, token]);

  if (isFetchingPins) return <LoadingIndicator centered large />;

  if (pins.length === 0)
    return <CenteringWrapper>Create a pin to get started</CenteringWrapper>;

  return (
    <Pins>
      {Object.values(pins).map((pin) => (
        <Pin key={pin.id} pin={pin} />
      ))}
    </Pins>
  );
};

export default PinList;
