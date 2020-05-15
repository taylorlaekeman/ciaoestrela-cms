import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import Pin from 'components/Pin';
import { selectors as pinSelectors } from 'state/pins';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 64px;
  width: 100%;
`;

const Pins = styled.ul`
  list-style: none;
  margin: 0;
  overflow: scroll;
  padding: 0 16px;
`;

const PinList = ({ pins }) => {
  const isFetchingPins = useSelector(pinSelectors.isFetchingPins);

  if (isFetchingPins)
    return (
      <LoadingWrapper>
        <LoadingIndicator large="true" />
      </LoadingWrapper>
    );

  if (pins.length === 0) return 'Create a pin to get started';

  return (
    <Pins>
      {pins.map((pin) => (
        <Pin key={pin.id} pin={pin} />
      ))}
    </Pins>
  );
};

PinList.propTypes = {
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      cost: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isAvailable: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PinList;
