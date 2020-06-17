import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import { selectors as pinSelectors } from 'state/pins';
import Pin from 'views/pins/Pin';

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

const PinList = ({ pins }) => {
  const isFetchingPins = useSelector(pinSelectors.isFetchingPins);

  if (isFetchingPins) return <LoadingIndicator centered large />;

  if (pins.length === 0)
    return <CenteringWrapper>Create a pin to get started</CenteringWrapper>;

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
